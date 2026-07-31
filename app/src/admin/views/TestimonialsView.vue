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
  { key: 'customer_name', label: 'Customer', primary: true },
  { key: 'rating', label: 'Rating' },
  { key: 'approved', label: 'Status' },
]

async function load() {
  const { data } = await supabase.from('testimonials').select('*').order('id', { ascending: false })
  items.value = data || []
}
onMounted(load)

function openRow(row: any) {
  active.value = { ...row }
  drawerOpen.value = true
}

function openNew() {
  active.value = { customer_name: '', quote: '', rating: 5, approved: false }
  drawerOpen.value = true
}

async function save() {
  const { id, ...payload } = active.value
  if (id) await supabase.from('testimonials').update(payload).eq('id', id)
  else await supabase.from('testimonials').insert(payload)
  drawerOpen.value = false
  load()
}

async function remove() {
  if (!active.value.id || !confirm('Delete this testimonial?')) return
  await supabase.from('testimonials').delete().eq('id', active.value.id)
  drawerOpen.value = false
  load()
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="font-heading text-3xl text-romara-ink">Testimonials</h1>
      <button
        class="bg-romara-amber hover:bg-romara-amber text-white text-sm font-medium rounded-lg px-4 py-2.5 transition-colors"
        @click="openNew"
      >
        + Add testimonial
      </button>
    </div>

    <div class="bg-white border border-romara-ink/10 rounded-xl overflow-hidden">
      <DataTable :columns="columns" :rows="items" empty-label="No testimonials yet." @row-click="openRow">
        <template #cell-rating="{ row }">{{ '★'.repeat(row.rating) }}</template>
        <template #cell-approved="{ row }"><StatusStamp :status="row.approved ? 'approved' : 'pending'" /></template>
      </DataTable>
    </div>

    <SlideOver :open="drawerOpen" :title="active?.id ? 'Edit testimonial' : 'New testimonial'" @close="drawerOpen = false">
      <form v-if="active" class="space-y-4" @submit.prevent="save">
        <div>
          <label class="block text-sm font-medium text-romara-ink mb-1.5">Customer name</label>
          <input v-model="active.customer_name" required class="w-full rounded-lg border border-romara-ink/10 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-romara-amber" />
        </div>
        <div>
          <label class="block text-sm font-medium text-romara-ink mb-1.5">Quote</label>
          <textarea v-model="active.quote" rows="4" required class="w-full rounded-lg border border-romara-ink/10 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-romara-amber" />
        </div>
        <div>
          <label class="block text-sm font-medium text-romara-ink mb-1.5">Rating</label>
          <select v-model.number="active.rating" class="w-full rounded-lg border border-romara-ink/10 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-romara-amber">
            <option v-for="n in 5" :key="n" :value="n">{{ n }} star{{ n > 1 ? 's' : '' }}</option>
          </select>
        </div>
        <label class="flex items-center gap-2.5">
          <input v-model="active.approved" type="checkbox" class="w-4 h-4 rounded border-romara-ink/10 text-romara-amber focus:ring-romara-amber" />
          <span class="text-sm text-romara-ink">Approved (visible on live site)</span>
        </label>
        <div class="flex items-center justify-between pt-2">
          <button v-if="active.id" type="button" class="text-romara-amber text-sm font-medium hover:underline" @click="remove">Delete</button>
          <div v-else />
          <button type="submit" class="bg-romara-amber hover:bg-romara-amber text-white font-medium rounded-lg px-5 py-2.5">Save</button>
        </div>
      </form>
    </SlideOver>
  </div>
</template>
