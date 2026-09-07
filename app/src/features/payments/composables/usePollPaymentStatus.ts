import { onUnmounted, ref, shallowRef } from 'vue'
import { getPaymentStatus, type PaymentStatus } from '@/features/payments/api/payments.api'

/** The STK prompt expires after about a minute; allow generously for the callback. */
const TIMEOUT_MS = 150_000
const INTERVAL_MS = 3_000

/**
 * Polls a payment until it settles.
 *
 * "Settled" only means the prompt is over — approved, declined, cancelled or
 * timed out. It does not mean paid. `paid` stays false until an admin confirms
 * the funds, so the UI can say "received, confirming" in between rather than
 * claiming success it cannot yet stand behind.
 */
export function usePollPaymentStatus() {
  const status = shallowRef<PaymentStatus | null>(null)
  const isPolling = ref(false)
  const timedOut = ref(false)

  let timer: number | undefined
  let stopped = false

  function stop() {
    stopped = true
    isPolling.value = false
    if (timer !== undefined) {
      window.clearTimeout(timer)
      timer = undefined
    }
  }

  async function start(checkoutRequestId: string): Promise<PaymentStatus | null> {
    stop()
    stopped = false
    isPolling.value = true
    timedOut.value = false
    status.value = null

    const deadline = Date.now() + TIMEOUT_MS

    return new Promise((resolve) => {
      async function tick() {
        if (stopped) return resolve(status.value)

        try {
          const result = await getPaymentStatus(checkoutRequestId)
          status.value = result

          if (result.settled) {
            stop()
            return resolve(result)
          }
        } catch {
          // A dropped poll is not a failed payment — the money may still be
          // moving. Keep trying until the deadline rather than giving up.
        }

        if (Date.now() >= deadline) {
          timedOut.value = true
          stop()
          return resolve(status.value)
        }

        timer = window.setTimeout(tick, INTERVAL_MS)
      }

      tick()
    })
  }

  onUnmounted(stop)

  return { status, isPolling, timedOut, start, stop }
}
