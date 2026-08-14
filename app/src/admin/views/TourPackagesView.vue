<script setup lang="ts">
/**
 * Columns match the real tour_packages schema. The previous version listed
 * title / price_kes / duration_days / published, none of which exist, so every
 * cell rendered blank.
 */
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/shared/api/supabaseClient'
import DataTable from '@/admin/components/DataTable.vue'
import StatusStamp from '@/admin/components/StatusStamp.vue'

const router = useRouter()
const tours = ref<any[]>([])
const loading = ref(true)
const error = ref('')

const columns = [
  { key: 'name', label: 'Tour', primary: true },
  { key: 'destination', label: 'Destination' },
  { key: 'price', label: 'Price' },
  { key: 'duration', label: 'Duration' },
  { key: 'is_published', label: 'Status' },
]

async function loadTours() {
  loading.value = true
  const { data, error: err } = await supabase
    .from('tour_packages')
    .select('id, name, destination, price, duration, is_published')
    .order('created_at', { ascending: false })
  loading.value = false

  if (err) {
    error.value = err.message
    return
  }
  error.value = ''
  tours.value = data || []
}

onMounted(loadTours)

function openTour(row: any) {
  router.push(`/admin/tours/${row.id}`)
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <p class="admin-eyebrow">Website content</p>
    <h1 class="admin-title">Tour Packages</h1>
      <RouterLink
        to="/admin/tours/new"
        class="admin-btn"
      >
        + Add tour
      </RouterLink>
    </div>

    <p v-if="error" class="mb-4 admin-notice">
      {{ error }}
    </p>

    <div class="admin-card overflow-hidden">
      <DataTable
        :columns="columns"
        :rows="tours"
        :empty-label="loading ? 'Loading…' : 'No tour packages yet — add your first one.'"
        @row-click="openTour"
      >
        <template #cell-price="{ row }">KES {{ Number(row.price || 0).toLocaleString() }}</template>
        <template #cell-duration="{ row }">{{ row.duration }} days</template>
        <template #cell-is_published="{ row }">
          <StatusStamp :status="row.is_published ? 'published' : 'draft'" />
        </template>
      </DataTable>
    </div>

    <p class="text-xs text-romara-ink/50 mt-3">
      Published tours appear on the live site immediately.
    </p>
  </div>
</template>
