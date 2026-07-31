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
  { key: 'title', label: 'Post', primary: true },
  { key: 'published_at', label: 'Status' },
]

async function load() {
  const { data } = await supabase.from('blog_posts').select('*').order('id', { ascending: false })
  items.value = data || []
}
onMounted(load)

function slugify(t: string) { return t.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') }

function openRow(row: any) { active.value = { ...row }; drawerOpen.value = true }
function openNew() { active.value = { title: '', slug: '', body: '', cover_image: '', published_at: null }; drawerOpen.value = true }

async function save() {
  const { id, ...payload } = active.value
  if (id) await supabase.from('blog_posts').update(payload).eq('id', id)
  else await supabase.from('blog_posts').insert(payload)
  drawerOpen.value = false
  load()
}

async function remove() {
  if (!active.value.id || !confirm('Delete this post?')) return
  await supabase.from('blog_posts').delete().eq('id', active.value.id)
  drawerOpen.value = false
  load()
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="font-heading text-3xl text-romara-ink">Blog</h1>
      <button class="bg-romara-amber hover:bg-romara-amber text-white text-sm font-medium rounded-lg px-4 py-2.5" @click="openNew">
        + Write post
      </button>
    </div>

    <div class="bg-white border border-romara-ink/10 rounded-xl overflow-hidden">
      <DataTable :columns="columns" :rows="items" empty-label="No blog posts yet." @row-click="openRow">
        <template #cell-published_at="{ row }"><StatusStamp :status="row.published_at ? 'published' : 'draft'" /></template>
      </DataTable>
    </div>

    <SlideOver :open="drawerOpen" :title="active?.id ? 'Edit post' : 'New post'" @close="drawerOpen = false">
      <form v-if="active" class="space-y-4" @submit.prevent="save">
        <div>
          <label class="block text-sm font-medium text-romara-ink mb-1.5">Title</label>
          <input v-model="active.title" required @input="active.slug = active.id ? active.slug : slugify(active.title)" class="w-full rounded-lg border border-romara-ink/10 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-romara-amber" />
        </div>
        <div>
          <label class="block text-sm font-medium text-romara-ink mb-1.5">Cover image URL</label>
          <input v-model="active.cover_image" class="w-full rounded-lg border border-romara-ink/10 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-romara-amber" />
        </div>
        <div>
          <label class="block text-sm font-medium text-romara-ink mb-1.5">Body</label>
          <textarea v-model="active.body" rows="8" required class="w-full rounded-lg border border-romara-ink/10 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-romara-amber" />
        </div>
        <label class="flex items-center gap-2.5">
          <input
            type="checkbox"
            :checked="!!active.published_at"
            class="w-4 h-4 rounded border-romara-ink/10 text-romara-amber focus:ring-romara-amber"
            @change="active.published_at = ($event.target as HTMLInputElement).checked ? new Date().toISOString() : null"
          />
          <span class="text-sm text-romara-ink">Published</span>
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
