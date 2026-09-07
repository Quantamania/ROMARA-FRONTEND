import { supabase } from '@/shared/api/supabaseClient'

/**
 * What the customer is paying for. The backend takes exactly one of these and
 * rejects a request naming both or neither — a hire and a booking are separate
 * ledgers, and a payment belongs to precisely one.
 */
export type PaymentTarget = { bookingId: number } | { vehicleHireId: number }

export interface StkPushResult {
  success: boolean
  /** Follow this with pollPaymentStatus to find out what happened. */
  checkoutRequestId?: string
  message?: string
  amount?: number
  bookingReference?: string | null
  /** Machine-readable failure, e.g. invalid_phone, already_paid, no_amount_due. */
  code?: string
  error?: string
}

export interface PaymentStatus {
  success: boolean
  settled: boolean
  /** Money arrived AND an admin confirmed it. Only celebrate on this. */
  paid: boolean
  /** Money arrived, nobody has checked it yet. */
  moneyReceived: boolean
  awaitingConfirmation: boolean
  status: string
  message: string
  amount: number | null
  mpesaReceiptNumber: string | null
  bookingReference: string | null
  code?: string
}

/**
 * Edge functions answer failures with a meaningful JSON body and a 4xx status.
 * supabase-js turns any non-2xx into an error whose body is unread, so the
 * useful part ("invalid_phone", "already_paid") is thrown away unless we dig it
 * back out of error.context. Without this the customer sees "Edge Function
 * returned a non-2xx status code" instead of "check the number and try again".
 */
async function callFunction<T extends { success: boolean }>(
  name: string,
  body: Record<string, unknown>,
): Promise<T> {
  const { data, error } = await supabase.functions.invoke(name, { body })

  if (!error) return data as T

  const response = (error as { context?: Response }).context
  if (response && typeof response.json === 'function') {
    try {
      return (await response.json()) as T
    } catch {
      // Body wasn't JSON — fall through to the generic message below.
    }
  }

  return {
    success: false,
    code: 'network_error',
    error: 'We could not reach the payment service. Check your connection and try again.',
  } as unknown as T
}

/** Sends the M-Pesa prompt to the customer's phone. */
export function startStkPush(
  target: PaymentTarget,
  phoneNumber: string,
  amount?: number,
): Promise<StkPushResult> {
  return callFunction<StkPushResult>('mpesa-stk-push', {
    ...target,
    phoneNumber,
    ...(amount != null ? { amount } : {}),
  })
}

/** One reading of where a payment has got to. */
export function getPaymentStatus(checkoutRequestId: string): Promise<PaymentStatus> {
  return callFunction<PaymentStatus>('mpesa-status', { checkoutRequestId })
}

export interface Payable {
  kind: 'booking' | 'vehicle_hire'
  targetId: number
  reference: string
  description: string
  total: number
  paid: number
  outstanding: number
  payable: boolean
  /** Why it cannot be paid, when payable is false. */
  reason: string | null
}

/**
 * Finds what is owed against a reference. Both the reference and the email must
 * match — the reference travels in emails, so on its own it is not enough to
 * pull up someone's booking.
 *
 * Returns null when nothing matches, deliberately without saying which half was
 * wrong.
 */
export async function lookupPayable(
  reference: string,
  email: string,
): Promise<Payable | null> {
  const { data, error } = await supabase.rpc('lookup_payable', {
    p_reference: reference.trim(),
    p_email: email.trim(),
  })

  if (error) throw error

  const row = (data as Record<string, unknown>[] | null)?.[0]
  if (!row) return null

  return {
    kind: row.kind as Payable['kind'],
    targetId: Number(row.target_id),
    reference: String(row.reference),
    description: String(row.description),
    total: Number(row.total ?? 0),
    paid: Number(row.paid ?? 0),
    outstanding: Number(row.outstanding ?? 0),
    payable: Boolean(row.payable),
    reason: (row.reason as string | null) ?? null,
  }
}
