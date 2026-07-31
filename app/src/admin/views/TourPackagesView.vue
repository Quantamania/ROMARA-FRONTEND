<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/shared/api/supabaseClient'
import DataTable from '@/admin/components/DataTable.vue'
import StatusStamp from '@/admin/components/StatusStamp.vue'

const router = useRouter()
const tours = ref<any[]>([])
const loading = ref(true)

const columns = [
  { key: 'title', label: 'Tour', primary: true },
  { key: 'price_kes', label: 'Price' },
  { key: 'duration_days', label: 'Duration' },
  { key: 'published', label: 'Status' },
]

async function loadTours() {
  loading.value = true
  const { data } = await supabase.from('tour_packages').select('*').order('created_at', { ascending: false })
  tours.value = data || []
  loading.value = false
}

onMounted(loadTours)

function openTour(row: any) {
  router.push(`/admin/tours/${row.id}`)
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="font-heading text-3xl text-romara-ink">Tour Packages</h1>
      <RouterLink
        to="/admin/tours/new"
        class="bg-romara-amber hover:bg-romara-amber text-white text-sm font-medium rounded-lg px-4 py-2.5 transition-colors"
      >
        + Add tour
      </RouterLink>
    </div>

    <div class="bg-white border border-romara-ink/10 rounded-xl overflow-hidden">
      <DataTable
        :columns="columns"
        :rows="tours"
        empty-label="No tour packages yet — add your first one."
        @row-click="openTour"
      >
        <template #cell-price_kes="{ row }">KES {{ row.price_kes?.toLocaleString() }}</template>
        <template #cell-duration_days="{ row }">{{ row.duration_days }} days</template>
        <template #cell-published="{ row }">
          <StatusStamp :status="row.published ? 'published' : 'draft'" />
        </template>
      </DataTable>
    </div>
  </div>
</template>
