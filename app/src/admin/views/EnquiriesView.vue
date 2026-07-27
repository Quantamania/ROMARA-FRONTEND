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
  { key: 'name', label: 'From', primary: true },
  { key: 'phone', label: 'Phone' },
  { key: 'status', label: 'Status' },
]

async function load() {
  const { data } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false })
  items.value = data || []
}
onMounted(load)

function openRow(row: any) { active.value = { ...row }; drawerOpen.value = true }

async function setStatus(status: string) {
  await supabase.from('enquiries').update({ status }).eq('id', active.value.id)
  active.value.status = status
  load()
}
</script>

<template>
  <div>
    <h1 class="font-display text-3xl text-ink mb-6">Enquiries</h1>

    <div class="bg-white border border-sand-300 rounded-xl overflow-hidden">
      <DataTable :columns="columns" :rows="items" empty-label="No enquiries yet." @row-click="openRow">
        <template #cell-status="{ row }"><StatusStamp :status="row.status" /></template>
      </DataTable>
    </div>

    <SlideOver :open="drawerOpen" title="Enquiry" @close="drawerOpen = false">
      <div v-if="active" class="space-y-4">
        <div>
          <p class="text-xs text-ink-light uppercase tracking-wide">From</p>
          <p class="text-ink font-medium">{{ active.name }}</p>
        </div>
        <div v-if="active.email">
          <p class="text-xs text-ink-light uppercase tracking-wide">Email</p>
          <a :href="`mailto:${active.email}`" class="text-terracotta hover:underline">{{ active.email }}</a>
        </div>
        <div v-if="active.phone">
          <p class="text-xs text-ink-light uppercase tracking-wide">Phone</p>
          <a :href="`tel:${active.phone}`" class="text-terracotta hover:underline">{{ active.phone }}</a>
        </div>
        <div>
          <p class="text-xs text-ink-light uppercase tracking-wide">Message</p>
          <p class="text-ink whitespace-pre-wrap">{{ active.message }}</p>
        </div>
        <div class="pt-3 border-t border-sand-200 flex gap-2">
          <button
            class="flex-1 bg-safari-green text-white text-sm font-medium rounded-lg py-2.5 disabled:opacity-50"
            :disabled="active.status === 'responded'"
            @click="setStatus('responded')"
          >
            Mark responded
          </button>
          <button
            class="flex-1 bg-sand-100 border border-sand-300 text-ink text-sm font-medium rounded-lg py-2.5 disabled:opacity-50"
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
