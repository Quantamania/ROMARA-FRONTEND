<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/shared/api/supabaseClient'
import DataTable from '@/admin/components/DataTable.vue'
import StatusStamp from '@/admin/components/StatusStamp.vue'
import SlideOver from '@/admin/components/SlideOver.vue'

const items = ref<any[]>([])
const drawerOpen = ref(false)
const active = ref<any>(null)
const saving = ref(false)
const error = ref('')

const columns = [
  { key: 'full_name', label: 'From', primary: true },
  { key: 'airport', label: 'Airport' },
  { key: 'travel_date', label: 'Travel date' },
  { key: 'status', label: 'Status' },
]

async function load() {
  const { data, error: err } = await supabase
    .from('transfer_bookings')
    .select('*')
    .order('travel_date', { ascending: true })

  if (err) {
    error.value = err.message
    return
  }
  error.value = ''
  items.value = data || []
}
onMounted(load)

function openRow(row: any) {
  active.value = { ...row }
  drawerOpen.value = true
}

/** Luggage is spread across three columns; the driver needs the total. */
const luggage = computed(() => {
  if (!active.value) return []
  return [
    { label: 'Hand luggage', value: active.value.hand_luggage },
    { label: 'Medium bags', value: active.value.medium_bags },
    { label: 'Large suitcases', value: active.value.large_suitcases },
  ].filter((entry) => Number(entry.value) > 0)
})

const partySize = computed(() => {
  if (!active.value) return 0
  return (active.value.adults || 0) + (active.value.children || 0) + (active.value.infants || 0)
})

async function setStatus(status: string) {
  saving.value = true
  const { error: err } = await supabase
    .from('transfer_bookings')
    .update({ status })
    .eq('id', active.value.id)
  saving.value = false

  if (err) {
    error.value = err.message
    return
  }
  active.value.status = status
  load()
}
</script>

<template>
  <div>
    <p class="admin-eyebrow">Enquiries & bookings</p>
    <h1 class="admin-title">Airport Transfers</h1>
    <span class="admin-title-rule" />

    <p v-if="error" class="mb-4 admin-notice">
      {{ error }}
    </p>

    <div class="admin-card overflow-hidden">
      <DataTable
        :columns="columns"
        :rows="items"
        empty-label="No transfer requests yet."
        @row-click="openRow"
      >
        <template #cell-status="{ row }"><StatusStamp :status="row.status" /></template>
      </DataTable>
    </div>

    <SlideOver :open="drawerOpen" title="Airport Transfer" @close="drawerOpen = false">
      <div v-if="active" class="space-y-4">
        <div>
          <p class="admin-eyebrow">Reference</p>
          <p class="text-romara-ink font-medium">{{ active.booking_reference }}</p>
        </div>

        <div>
          <p class="admin-eyebrow">From</p>
          <p class="text-romara-ink font-medium">{{ active.full_name }}</p>
          <a :href="`mailto:${active.email}`" class="text-romara-amber hover:underline block">{{ active.email }}</a>
          <a :href="`tel:${active.phone}`" class="text-romara-amber hover:underline">{{ active.phone }}</a>
        </div>

        <div>
          <p class="admin-eyebrow">Flight</p>
          <p class="text-romara-ink capitalize">{{ active.transfer_type }} · {{ active.airport }}</p>
          <p class="text-romara-ink">{{ active.travel_date }} at {{ active.travel_time }}</p>
          <p v-if="active.flight_number || active.airline" class="text-romara-ink">
            {{ active.airline }} {{ active.flight_number }}
          </p>
        </div>

        <div>
          <p class="admin-eyebrow">Destination</p>
          <p class="text-romara-ink capitalize">{{ active.destination_type }}</p>
          <p class="text-romara-ink whitespace-pre-wrap">{{ active.destination_address }}</p>
        </div>

        <div>
          <p class="admin-eyebrow">Party</p>
          <p class="text-romara-ink">
            {{ partySize }} total —
            {{ active.adults }} adults<span v-if="active.children">, {{ active.children }} children</span><span v-if="active.infants">, {{ active.infants }} infants</span>
          </p>
          <p class="text-romara-ink">Vehicle: {{ active.vehicle_preference }}</p>
        </div>

        <div v-if="luggage.length">
          <p class="admin-eyebrow">Luggage</p>
          <p v-for="entry in luggage" :key="entry.label" class="text-romara-ink">
            {{ entry.label }}: {{ entry.value }}
          </p>
          <p v-if="active.special_equipment" class="text-romara-ink whitespace-pre-wrap">
            {{ active.special_equipment }}
          </p>
        </div>

        <div v-if="active.additional_requests">
          <p class="admin-eyebrow">Additional requests</p>
          <p class="text-romara-ink whitespace-pre-wrap">{{ active.additional_requests }}</p>
        </div>

        <div>
          <p class="admin-eyebrow">Payment preference</p>
          <p class="text-romara-ink">{{ active.payment_preference }}</p>
        </div>

        <div class="pt-3 border-t border-romara-ink/10 grid grid-cols-3 gap-2">
          <button
            class="admin-btn-confirm flex-1"
            :disabled="saving || active.status === 'confirmed'"
            @click="setStatus('confirmed')"
          >
            Confirm
          </button>
          <button
            class="admin-btn-ghost flex-1"
            :disabled="saving || active.status === 'completed'"
            @click="setStatus('completed')"
          >
            Complete
          </button>
          <button
            class="admin-btn-ghost flex-1"
            :disabled="saving || active.status === 'cancelled'"
            @click="setStatus('cancelled')"
          >
            Cancel
          </button>
        </div>
      </div>
    </SlideOver>
  </div>
</template>
