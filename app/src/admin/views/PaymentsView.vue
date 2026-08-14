<script setup lang="ts">
/**
 * Read-only by design. Payments are a financial record: the admin panel shows
 * them, it never edits them. Every row here was written by the M-Pesa Edge
 * Functions against Safaricom's own callback.
 */
import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/shared/api/supabaseClient'
import DataTable from '@/admin/components/DataTable.vue'
import StatusStamp from '@/admin/components/StatusStamp.vue'
import SlideOver from '@/admin/components/SlideOver.vue'

const rows = ref<any[]>([])
const drawerOpen = ref(false)
const active = ref<any>(null)
const error = ref('')
const working = ref(false)
const filter = ref<'all' | 'awaiting' | 'completed' | 'pending' | 'failed'>('awaiting')

const columns = [
  { key: 'reference', label: 'Booking', primary: true },
  { key: 'customer', label: 'Customer' },
  { key: 'display_amount', label: 'Amount' },
  { key: 'mpesa_receipt_number', label: 'M-Pesa receipt' },
  { key: 'status', label: 'Status' },
]

function money(value: unknown) {
  const n = Number(value)
  return Number.isFinite(n) ? `KES ${n.toLocaleString()}` : '—'
}

async function load() {
  const { data, error: err } = await supabase
    .from('payments')
    .select('id, booking_id, amount, paid_amount, status, phone, mpesa_receipt_number, result_code, result_desc, transaction_date, checkout_request_id, created_at, verified_at, verification_note, bookings(booking_reference, full_name, email, total_price, status, payment_status)')
    .order('created_at', { ascending: false })

  if (err) {
    error.value = err.message
    return
  }
  error.value = ''
  rows.value = (data || []).map((row: any) => ({
    ...row,
    reference: row.bookings?.booking_reference ?? `Booking #${row.booking_id}`,
    customer: row.bookings?.full_name ?? '—',
    // paid_amount is what M-Pesa actually took; amount is what we asked for.
    display_amount: money(row.paid_amount ?? row.amount),
  }))
}
onMounted(load)

const awaiting = (r: any) => r.status === 'completed' && !r.verified_at

const visible = computed(() => {
  if (filter.value === 'all') return rows.value
  if (filter.value === 'awaiting') return rows.value.filter(awaiting)
  if (filter.value === 'completed') return rows.value.filter((r) => r.status === 'completed' && r.verified_at)
  return rows.value.filter((r) => r.status === filter.value)
})

// Confirmed money only — the whole point of verification is that unchecked
// funds are not counted as revenue.
const collected = computed(() =>
  rows.value
    .filter((r) => r.status === 'completed' && r.verified_at)
    .reduce((sum, r) => sum + Number(r.paid_amount ?? r.amount ?? 0), 0),
)

const awaitingTotal = computed(() =>
  rows.value.filter(awaiting).reduce((sum, r) => sum + Number(r.paid_amount ?? r.amount ?? 0), 0),
)

async function confirmPayment() {
  if (!active.value || working.value) return
  working.value = true
  const { data, error: err } = await supabase.rpc('verify_payment', {
    p_payment_id: active.value.id,
    p_note: null,
  })
  working.value = false
  if (err) { error.value = err.message; return }
  if (!data?.ok) { error.value = data?.message || 'Could not confirm this payment.'; return }
  error.value = ''
  drawerOpen.value = false
  load()
}

async function rejectPayment() {
  if (!active.value || working.value) return
  const reason = prompt('Why is this payment being rejected? (recorded against the payment)')
  if (!reason) return
  working.value = true
  const { data, error: err } = await supabase.rpc('reject_payment', {
    p_payment_id: active.value.id,
    p_reason: reason,
  })
  working.value = false
  if (err) { error.value = err.message; return }
  if (!data?.ok) { error.value = data?.message || 'Could not reject this payment.'; return }
  error.value = ''
  drawerOpen.value = false
  load()
}

const counts = computed(() => ({
  all: rows.value.length,
  awaiting: rows.value.filter(awaiting).length,
  completed: rows.value.filter((r) => r.status === 'completed' && r.verified_at).length,
  pending: rows.value.filter((r) => r.status === 'pending').length,
  failed: rows.value.filter((r) => r.status === 'failed' || r.status === 'cancelled').length,
}))

function openRow(row: any) {
  active.value = row
  drawerOpen.value = true
}

function formatDate(value: string | null) {
  return value ? new Date(value).toLocaleString() : '—'
}

const tabs = [
  { key: 'awaiting', label: 'To confirm' },
  { key: 'completed', label: 'Confirmed' },
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'failed', label: 'Failed' },
] as const
</script>

<template>
  <div>
    <div class="flex flex-wrap items-baseline justify-between gap-3 mb-6">
      <p class="admin-eyebrow">Money</p>
    <h1 class="admin-title">Payments</h1>
    <span class="admin-title-rule" />
      <div class="text-sm text-romara-ink-soft text-right">
        <p>Confirmed <span class="font-heading text-lg text-romara-ink ml-1">{{ money(collected) }}</span></p>
        <p v-if="awaitingTotal > 0" class="text-romara-amber">
          {{ money(awaitingTotal) }} awaiting confirmation
        </p>
      </div>
    </div>

    <p v-if="error" class="mb-4 admin-notice">
      {{ error }}
    </p>

    <div class="flex flex-wrap gap-2 mb-4">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="text-sm font-medium rounded-card px-3 py-1.5 border transition-colors"
        :class="filter === tab.key
          ? 'bg-romara-amber text-white border-romara-amber'
          : 'bg-white text-romara-ink border-romara-ink/10 hover:border-romara-amber'"
        @click="filter = tab.key"
      >
        {{ tab.label }} ({{ counts[tab.key] }})
      </button>
    </div>

    <div class="admin-card overflow-hidden">
      <DataTable
        :columns="columns"
        :rows="visible"
        empty-label="No payments yet."
        @row-click="openRow"
      >
        <template #cell-status="{ row }">
          <StatusStamp :status="row.status === 'completed' && !row.verified_at ? 'pending' : row.status" />
          <span v-if="row.status === 'completed' && !row.verified_at" class="block text-[11px] text-romara-amber mt-1">
            awaiting confirmation
          </span>
        </template>
        <template #cell-mpesa_receipt_number="{ row }">
          {{ row.mpesa_receipt_number || '—' }}
        </template>
      </DataTable>
    </div>

    <SlideOver :open="drawerOpen" title="Payment" @close="drawerOpen = false">
      <div v-if="active" class="space-y-4">
        <div>
          <p class="admin-eyebrow">Booking</p>
          <p class="text-romara-ink font-medium">{{ active.reference }}</p>
          <p class="text-romara-ink">{{ active.customer }}</p>
          <a
            v-if="active.bookings?.email"
            :href="`mailto:${active.bookings.email}`"
            class="text-romara-amber hover:underline"
          >{{ active.bookings.email }}</a>
        </div>

        <div>
          <p class="admin-eyebrow">Amount</p>
          <p class="text-romara-ink">Requested: {{ money(active.amount) }}</p>
          <p v-if="active.paid_amount" class="text-romara-ink">Paid: {{ money(active.paid_amount) }}</p>
          <p v-if="active.bookings" class="text-romara-ink/60 text-sm">
            Booking total {{ money(active.bookings.total_price) }} · {{ active.bookings.payment_status }}
          </p>
        </div>

        <div>
          <p class="admin-eyebrow">M-Pesa</p>
          <p class="text-romara-ink">Receipt: {{ active.mpesa_receipt_number || '—' }}</p>
          <p class="text-romara-ink">Phone: {{ active.phone || '—' }}</p>
          <p class="text-romara-ink">Paid at: {{ formatDate(active.transaction_date) }}</p>
        </div>

        <div>
          <p class="admin-eyebrow">Outcome</p>
          <StatusStamp :status="active.status" />
          <p v-if="active.result_desc" class="text-romara-ink mt-2">{{ active.result_desc }}</p>
          <p v-if="active.result_code !== null" class="text-romara-ink/60 text-sm">
            Result code {{ active.result_code }}
          </p>
        </div>

        <div class="pt-3 border-t border-romara-ink/10">
          <p class="admin-eyebrow">Reference IDs</p>
          <p class="text-romara-ink/70 text-xs break-all">{{ active.checkout_request_id || '—' }}</p>
          <p class="text-romara-ink/50 text-xs mt-1">Requested {{ formatDate(active.created_at) }}</p>
        </div>

        <div v-if="active.status === 'completed' && !active.verified_at"
             class="pt-4 border-t border-romara-ink/10 space-y-3">
          <div class="admin-notice">
            M-Pesa reported this payment as successful. The customer has been told it was
            received, but their booking stays unconfirmed and no receipt is sent until you
            confirm the money actually arrived.
          </div>
          <div class="grid grid-cols-2 gap-2">
            <button class="admin-btn-confirm" :disabled="working" @click="confirmPayment">
              {{ working ? 'Working…' : 'Confirm received' }}
            </button>
            <button class="admin-btn-ghost" :disabled="working" @click="rejectPayment">
              Reject
            </button>
          </div>
        </div>

        <div v-else-if="active.verified_at" class="pt-4 border-t border-romara-ink/10">
          <p class="admin-eyebrow">Confirmed</p>
          <p class="text-romara-ink text-sm">{{ formatDate(active.verified_at) }}</p>
          <p v-if="active.verification_note" class="text-romara-ink-soft text-sm mt-1">
            {{ active.verification_note }}
          </p>
        </div>

        <p class="text-xs text-romara-ink/50 pt-3 border-t border-romara-ink/10">
          Payment records come from M-Pesa and cannot be edited here — only confirmed or rejected.
        </p>
      </div>
    </SlideOver>
  </div>
</template>
