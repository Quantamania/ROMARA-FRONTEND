<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/shared/api/supabaseClient'
import DataTable from '@/admin/components/DataTable.vue'
import StatusStamp from '@/admin/components/StatusStamp.vue'

const items = ref<any[]>([])

const columns = [
  { key: 'tour_title', label: 'Tour', primary: true },
  { key: 'travel_date', label: 'Travel date' },
  { key: 'num_travelers', label: 'Travelers' },
  { key: 'status', label: 'Status' },
]

async function load() {
  const { data } = await supabase
    .from('bookings')
    .select('*, tour_packages(title)')
    .order('created_at', { ascending: false })
  items.value = (data || []).map((b: any) => ({ ...b, tour_title: b.tour_packages?.title || '—' }))
}
onMounted(load)

async function setStatus(id: string, status: string) {
  await supabase.from('bookings').update({ status }).eq('id', id)
  load()
}
</script>

<template>
  <div>
    <h1 class="font-heading text-3xl text-romara-ink mb-6">Bookings</h1>

    <div class="bg-white border border-romara-ink/10 rounded-xl overflow-hidden">
      <DataTable :columns="columns" :rows="items" empty-label="No bookings yet.">
        <template #cell-status="{ row }">
          <div class="flex items-center gap-2">
            <StatusStamp :status="row.status" />
            <select
              class="text-xs border border-romara-ink/10 rounded px-1.5 py-1"
              :value="row.status"
              @click.stop
              @change="setStatus(row.id, ($event.target as HTMLSelectElement).value)"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </template>
      </DataTable>
    </div>
  </div>
</template>
