<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/shared/api/supabaseClient'
import DataTable from '@/admin/components/DataTable.vue'
import StatusStamp from '@/admin/components/StatusStamp.vue'

const items = ref<any[]>([])
const errorMessage = ref('')
const busyId = ref<number | null>(null)

const columns = [
  { key: 'booking_reference', label: 'Reference', primary: true },
  { key: 'tour_title', label: 'Tour' },
  { key: 'full_name', label: 'Guest' },
  { key: 'dates', label: 'Dates' },
  { key: 'number_of_travelers', label: 'Travelers' },
  { key: 'money', label: 'Paid / Total' },
  { key: 'status', label: 'Status' },
]

function money(amount: number | null) {
  return `KES ${new Intl.NumberFormat('en-KE').format(Number(amount ?? 0))}`
}

function shortDate(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })
}

async function load() {
  errorMessage.value = ''

  // Columns named explicitly rather than '*'. The previous version asked for
  // tour_packages(title) and bookings.travel_date / num_travelers — none of
  // which exist; title belongs to blog_posts and the other two were renamed in
  // 00010. PostgREST rejects the whole query for an unknown column, and the
  // error was being discarded, so this page showed "No bookings yet." however
  // many bookings there were.
  const { data, error } = await supabase
    .from('bookings')
    .select(
      'id, booking_reference, full_name, email, phone, start_date, end_date, ' +
        'number_of_travelers, total_price, amount_paid, payment_status, status, ' +
        'created_at, tour_packages(name)',
    )
    .order('created_at', { ascending: false })

  if (error) {
    errorMessage.value = `Could not load bookings: ${error.message}`
    items.value = []
    return
  }

  items.value = (data || []).map((b: any) => ({
    ...b,
    tour_title: b.tour_packages?.name || '—',
    dates: `${shortDate(b.start_date)} – ${shortDate(b.end_date)}`,
    money: `${money(b.amount_paid)} / ${money(b.total_price)}`,
  }))
}
onMounted(load)

async function setStatus(id: number, status: string, current: string) {
  if (status === current) return

  errorMessage.value = ''
  busyId.value = id

  // Cancelling goes through cancel_booking, never a plain status update.
  // book_tour_seats takes the seats out of inventory when the booking is made,
  // and only that function puts them back. Setting status = 'cancelled'
  // directly would free nobody's seat, so every cancellation would shrink the
  // tour's capacity permanently and invisibly.
  const { error } =
    status === 'cancelled'
      ? await supabase.rpc('cancel_booking', { p_booking_id: id })
      : await supabase.from('bookings').update({ status }).eq('id', id)

  busyId.value = null

  if (error) {
    errorMessage.value = `Could not update booking: ${error.message}`
    return
  }

  await load()
}
</script>

<template>
  <div>
    <p class="admin-eyebrow">Enquiries &amp; bookings</p>
    <h1 class="admin-title">Bookings</h1>

    <p v-if="errorMessage" class="admin-card mb-4 border-l-4 border-red-500 px-4 py-3 text-sm text-red-700">
      {{ errorMessage }}
    </p>

    <div class="admin-card overflow-hidden">
      <DataTable :columns="columns" :rows="items" empty-label="No bookings yet.">
        <template #cell-status="{ row }">
          <div class="flex items-center gap-2">
            <StatusStamp :status="row.status" />
            <select
              class="rounded border border-romara-ink/10 px-1.5 py-1 text-xs disabled:opacity-50"
              :value="row.status"
              :disabled="busyId === row.id"
              @click.stop
              @change="setStatus(row.id, ($event.target as HTMLSelectElement).value, row.status)"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </template>
      </DataTable>
    </div>

    <p class="mt-3 text-xs text-romara-ink-soft">
      Cancelling returns the seats to the tour's availability.
    </p>
  </div>
</template>
