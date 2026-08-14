<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/shared/api/supabaseClient'
import DataTable from '@/admin/components/DataTable.vue'
import StatusStamp from '@/admin/components/StatusStamp.vue'
import SlideOver from '@/admin/components/SlideOver.vue'

const items = ref<any[]>([])
const drawerOpen = ref(false)
const active = ref<any>(null)

const columns = [
  { key: 'full_name', label: 'From', primary: true },
  { key: 'destination', label: 'Destination' },
  { key: 'travel_date', label: 'Travel date' },
  { key: 'status', label: 'Status' },
]

async function load() {
  const { data } = await supabase.from('booking_requests').select('id, full_name, email, phone, service, travel_type, destination, travel_date, length_of_stay, adults, children, special_requests, status').order('created_at', { ascending: false })
  items.value = data || []
}
onMounted(load)

function openRow(row: any) { active.value = { ...row }; drawerOpen.value = true }

async function setStatus(status: string) {
  await supabase.from('booking_requests').update({ status }).eq('id', active.value.id)
  active.value.status = status
  load()
}
</script>

<template>
  <div>
    <p class="admin-eyebrow">Enquiries & bookings</p>
    <h1 class="admin-title">Booking Requests</h1>
    <span class="admin-title-rule" />

    <div class="admin-card overflow-hidden">
      <DataTable :columns="columns" :rows="items" empty-label="No booking requests yet." @row-click="openRow">
        <template #cell-status="{ row }"><StatusStamp :status="row.status" /></template>
      </DataTable>
    </div>

    <SlideOver :open="drawerOpen" title="Booking Request" @close="drawerOpen = false">
      <div v-if="active" class="space-y-4">
        <div>
          <p class="admin-eyebrow">From</p>
          <p class="text-romara-ink font-medium">{{ active.full_name }}</p>
        </div>
        <div>
          <p class="admin-eyebrow">Contact</p>
          <a :href="`mailto:${active.email}`" class="text-romara-amber hover:underline block">{{ active.email }}</a>
          <a :href="`tel:${active.phone}`" class="text-romara-amber hover:underline">{{ active.phone }}</a>
        </div>
        <div>
          <p class="admin-eyebrow">Trip</p>
          <p class="text-romara-ink">{{ active.service }} — {{ active.travel_type }}</p>
          <p class="text-romara-ink">{{ active.destination }}</p>
          <p class="text-romara-ink">{{ active.travel_date }} · {{ active.length_of_stay }}</p>
          <p class="text-romara-ink">{{ active.adults }} adults, {{ active.children }} children</p>
        </div>
        <div v-if="active.special_requests">
          <p class="admin-eyebrow">Special requests</p>
          <p class="text-romara-ink whitespace-pre-wrap">{{ active.special_requests }}</p>
        </div>
        <div class="pt-3 border-t border-romara-ink/10 flex gap-2">
          <button
            class="admin-btn-confirm flex-1"
            :disabled="active.status === 'contacted'"
            @click="setStatus('contacted')"
          >
            Mark contacted
          </button>
          <button
            class="admin-btn-ghost flex-1"
            :disabled="active.status === 'closed'"
            @click="setStatus('closed')"
          >
            Close
          </button>
        </div>
      </div>
    </SlideOver>
  </div>
</template>