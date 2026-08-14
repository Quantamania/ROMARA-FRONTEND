<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/shared/api/supabaseClient'
import DataTable from '@/admin/components/DataTable.vue'
import StatusStamp from '@/admin/components/StatusStamp.vue'
import SlideOver from '@/admin/components/SlideOver.vue'
import { fleetByKey, type FleetKey } from '@/data/fleet'

const items = ref<any[]>([])
const drawerOpen = ref(false)
const active = ref<any>(null)
const saving = ref(false)
const error = ref('')

const columns = [
  { key: 'full_name', label: 'From', primary: true },
  { key: 'vehicle_name', label: 'Vehicle' },
  { key: 'pickup_date', label: 'Pickup' },
  { key: 'status', label: 'Status' },
]

/** The form stores a FleetKey; show the showroom name the customer saw. */
function vehicleName(key: string) {
  return fleetByKey[key as FleetKey]?.name ?? key
}

async function load() {
  const { data, error: err } = await supabase
    .from('vehicle_hire_requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (err) {
    error.value = err.message
    return
  }
  error.value = ''
  items.value = (data || []).map((row) => ({ ...row, vehicle_name: vehicleName(row.vehicle) }))
}
onMounted(load)

function openRow(row: any) {
  active.value = { ...row }
  drawerOpen.value = true
}

/** Rough guide only — the admin still types the figure they quote. */
const suggestedQuote = computed(() => {
  if (!active.value) return null
  const vehicle = fleetByKey[active.value.vehicle as FleetKey]
  if (!vehicle) return null

  const start = new Date(active.value.pickup_date)
  const end = active.value.return_date ? new Date(active.value.return_date) : start
  const days = Math.max(1, Math.round((end.getTime() - start.getTime()) / 86_400_000) + 1)

  const chauffeur = active.value.driver_option === 'chauffeur' ? 3500 * days : 0
  return { days, total: vehicle.dailyRate * days + chauffeur }
})

async function save(patch: Record<string, unknown>) {
  if (!active.value) return
  saving.value = true
  const { error: err } = await supabase
    .from('vehicle_hire_requests')
    .update(patch)
    .eq('id', active.value.id)
  saving.value = false

  if (err) {
    error.value = err.message
    return
  }
  Object.assign(active.value, patch)
  load()
}

function setStatus(status: string) {
  return save({ status })
}

function saveDetails() {
  return save({
    quoted_amount: active.value.quoted_amount === '' ? null : active.value.quoted_amount,
    admin_notes: active.value.admin_notes,
  })
}
</script>

<template>
  <div>
    <p class="admin-eyebrow">Enquiries & bookings</p>
    <h1 class="admin-title">Vehicle Hire</h1>

    <p v-if="error" class="mb-4 admin-notice">
      {{ error }}
    </p>

    <div class="admin-card overflow-hidden">
      <DataTable
        :columns="columns"
        :rows="items"
        empty-label="No vehicle hire requests yet."
        @row-click="openRow"
      >
        <template #cell-status="{ row }"><StatusStamp :status="row.status" /></template>
      </DataTable>
    </div>

    <SlideOver :open="drawerOpen" title="Vehicle Hire Request" @close="drawerOpen = false">
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
          <p class="admin-eyebrow">Vehicle</p>
          <p class="text-romara-ink">{{ vehicleName(active.vehicle) }}</p>
          <p class="text-romara-ink capitalize">{{ active.driver_option }}</p>
          <p class="text-romara-ink">{{ active.passengers }} passengers</p>
        </div>

        <div>
          <p class="admin-eyebrow">Dates</p>
          <p class="text-romara-ink">
            {{ active.pickup_date }}<span v-if="active.return_date"> → {{ active.return_date }}</span>
          </p>
          <p v-if="suggestedQuote" class="text-romara-ink/60 text-sm">
            {{ suggestedQuote.days }} day<span v-if="suggestedQuote.days > 1">s</span>
            · guide price KES {{ suggestedQuote.total.toLocaleString() }}
          </p>
        </div>

        <div>
          <p class="admin-eyebrow">Pickup / drop-off</p>
          <p class="text-romara-ink">{{ active.pickup_location }}</p>
          <p class="text-romara-ink">{{ active.dropoff_location || active.pickup_location }}</p>
        </div>

        <div v-if="active.purpose">
          <p class="admin-eyebrow">Purpose</p>
          <p class="text-romara-ink whitespace-pre-wrap">{{ active.purpose }}</p>
        </div>

        <div v-if="active.additional_requests">
          <p class="admin-eyebrow">Additional requests</p>
          <p class="text-romara-ink whitespace-pre-wrap">{{ active.additional_requests }}</p>
        </div>

        <div class="pt-3 border-t border-romara-ink/10 space-y-3">
          <div>
            <label class="admin-eyebrow block mb-1" for="quoted-amount">
              Quoted amount (KES)
            </label>
            <input
              id="quoted-amount"
              v-model="active.quoted_amount"
              type="number"
              min="0"
              class="admin-input"
              placeholder="e.g. 45000"
            />
          </div>

          <div>
            <label class="admin-eyebrow block mb-1" for="admin-notes">
              Internal notes
            </label>
            <textarea
              id="admin-notes"
              v-model="active.admin_notes"
              rows="3"
              class="admin-input"
              placeholder="Not shown to the customer"
            />
          </div>

          <button
            class="admin-btn-ghost w-full"
            :disabled="saving"
            @click="saveDetails"
          >
            {{ saving ? 'Saving…' : 'Save quote & notes' }}
          </button>
        </div>

        <div class="pt-3 border-t border-romara-ink/10 grid grid-cols-2 gap-2">
          <button
            class="admin-btn"
            :disabled="saving || active.status === 'quoted'"
            @click="setStatus('quoted')"
          >
            Mark quoted
          </button>
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
