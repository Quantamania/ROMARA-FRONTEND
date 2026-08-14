<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/shared/api/supabaseClient'
import DataTable from '@/admin/components/DataTable.vue'
import SlideOver from '@/admin/components/SlideOver.vue'

const items = ref<any[]>([])
const tours = ref<any[]>([])
const drawerOpen = ref(false)
const active = ref<any>(null)

const columns = [
  { key: 'title', label: 'Promotion', primary: true },
  { key: 'discount_percent', label: 'Discount' },
  { key: 'valid_to', label: 'Valid until' },
]

async function load() {
  const [promos, tourList] = await Promise.all([
    supabase.from('promotions').select('*').order('valid_to', { ascending: false }),
    supabase.from('tour_packages').select('id, title'),
  ])
  items.value = promos.data || []
  tours.value = tourList.data || []
}
onMounted(load)

function openRow(row: any) { active.value = { ...row }; drawerOpen.value = true }
function openNew() { active.value = { title: '', discount_percent: 10, valid_from: '', valid_to: '', tour_id: null }; drawerOpen.value = true }

async function save() {
  const { id, ...payload } = active.value
  if (id) await supabase.from('promotions').update(payload).eq('id', id)
  else await supabase.from('promotions').insert(payload)
  drawerOpen.value = false
  load()
}

async function remove() {
  if (!active.value.id || !confirm('Delete this promotion?')) return
  await supabase.from('promotions').delete().eq('id', active.value.id)
  drawerOpen.value = false
  load()
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <p class="admin-eyebrow">Website content</p>
    <h1 class="admin-title">Promotions</h1>
    <span class="admin-title-rule" />
      <button class="bg-romara-amber hover:bg-romara-amber text-white text-sm font-medium rounded-card px-4 py-2.5" @click="openNew">
        + Add promotion
      </button>
    </div>

    <div class="admin-card overflow-hidden">
      <DataTable :columns="columns" :rows="items" empty-label="No promotions running." @row-click="openRow">
        <template #cell-discount_percent="{ row }">{{ row.discount_percent }}% off</template>
      </DataTable>
    </div>

    <SlideOver :open="drawerOpen" :title="active?.id ? 'Edit promotion' : 'New promotion'" @close="drawerOpen = false">
      <form v-if="active" class="space-y-4" @submit.prevent="save">
        <div>
          <label class="admin-label">Title</label>
          <input v-model="active.title" required class="admin-input" />
        </div>
        <div>
          <label class="admin-label">Applies to tour</label>
          <select v-model="active.tour_id" class="admin-input">
            <option :value="null">All tours</option>
            <option v-for="t in tours" :key="t.id" :value="t.id">{{ t.title }}</option>
          </select>
        </div>
        <div>
          <label class="admin-label">Discount (%)</label>
          <input v-model.number="active.discount_percent" type="number" min="1" max="100" required class="admin-input" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="admin-label">Valid from</label>
            <input v-model="active.valid_from" type="date" class="admin-input" />
          </div>
          <div>
            <label class="admin-label">Valid to</label>
            <input v-model="active.valid_to" type="date" class="admin-input" />
          </div>
        </div>
        <div class="flex items-center justify-between pt-2">
          <button v-if="active.id" type="button" class="text-romara-amber text-sm font-medium hover:underline" @click="remove">Delete</button>
          <div v-else />
          <button type="submit" class="bg-romara-amber hover:bg-romara-amber text-white font-medium rounded-card px-5 py-2.5">Save</button>
        </div>
      </form>
    </SlideOver>
  </div>
</template>
