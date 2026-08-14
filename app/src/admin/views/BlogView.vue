<script setup lang="ts">
/**
 * Writes the columns blog_posts actually has. The previous version saved
 * `body` and `cover_image`, neither of which exist, and never set `status` —
 * so a post could never reach the public site, which reads
 * status = 'published'.
 */
import { ref, onMounted } from 'vue'
import { supabase } from '@/shared/api/supabaseClient'
import DataTable from '@/admin/components/DataTable.vue'
import StatusStamp from '@/admin/components/StatusStamp.vue'
import SlideOver from '@/admin/components/SlideOver.vue'

const items = ref<any[]>([])
const drawerOpen = ref(false)
const active = ref<any>(null)
const saving = ref(false)
const uploading = ref(false)
const error = ref('')

// Must match the filter on the public blog page.
const categories = [
  { value: 'safari-tips', label: 'Safari Tips' },
  { value: 'destinations', label: 'Destinations' },
  { value: 'travel-guides', label: 'Travel Guides' },
  { value: 'wildlife', label: 'Wildlife' },
  { value: 'travel-news', label: 'Travel News' },
  { value: 'culture-people', label: 'Culture & People' },
]

const columns = [
  { key: 'title', label: 'Post', primary: true },
  { key: 'category', label: 'Category' },
  { key: 'status', label: 'Status' },
]

async function load() {
  const { data, error: err } = await supabase
    .from('blog_posts')
    .select('id, title, slug, category, status, featured, published_at, created_at')
    .order('created_at', { ascending: false })

  if (err) {
    error.value = err.message
    return
  }
  error.value = ''
  items.value = data || []
}
onMounted(load)

function slugify(t: string) {
  return t.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
}

async function openRow(row: any) {
  error.value = ''
  // The list deliberately does not fetch `content` — article bodies would make
  // it the heaviest request in the panel. Pull the full row for editing, or
  // saving would write back an empty body.
  active.value = { ...row }
  drawerOpen.value = true

  const { data, error: err } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', row.id)
    .single()

  if (err) {
    error.value = `Could not load the full post: ${err.message}`
    return
  }
  // Ignore if the admin already closed the drawer or opened a different post.
  if (data && active.value?.id === data.id) active.value = data
}

function openNew() {
  active.value = {
    title: '', slug: '', excerpt: '', content: '', featured_image_url: '',
    category: 'safari-tips', read_time_minutes: 5, featured: false, status: 'draft',
  }
  error.value = ''
  drawerOpen.value = true
}

function onTitleInput() {
  if (!active.value.id) active.value.slug = slugify(active.value.title)
}

async function uploadCover(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  uploading.value = true
  error.value = ''

  const path = `${Date.now()}-${file.name.replace(/[^\w.-]/g, '_')}`
  const { error: upErr } = await supabase.storage.from('blog-images').upload(path, file)

  if (upErr) error.value = `Image upload failed: ${upErr.message}`
  else active.value.featured_image_url = supabase.storage.from('blog-images').getPublicUrl(path).data.publicUrl

  uploading.value = false
}

async function save() {
  saving.value = true
  error.value = ''

  const { id, created_at, updated_at, user_id, views, ...rest } = active.value
  if (!rest.slug) rest.slug = slugify(rest.title)

  // published_at drives the ordering and the date on the card.
  if (rest.status === 'published' && !rest.published_at) rest.published_at = new Date().toISOString()
  if (rest.status !== 'published') rest.published_at = null

  const { error: err } = id
    ? await supabase.from('blog_posts').update(rest).eq('id', id)
    : await supabase.from('blog_posts').insert(rest)

  saving.value = false

  if (err) {
    error.value = err.message.includes('blog_posts_slug_key')
      ? 'Another post already uses that URL slug.'
      : err.message
    return
  }
  drawerOpen.value = false
  load()
}

async function remove() {
  if (!active.value.id) return
  if (!confirm('Delete this post? It disappears from the live site immediately.')) return

  const { error: err } = await supabase.from('blog_posts').delete().eq('id', active.value.id)
  if (err) {
    error.value = err.message
    return
  }
  drawerOpen.value = false
  load()
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <p class="admin-eyebrow">Website content</p>
    <h1 class="admin-title">Blog</h1>
    <span class="admin-title-rule" />
      <button class="admin-btn" @click="openNew">
        + Write post
      </button>
    </div>

    <p v-if="error && !drawerOpen" class="mb-4 admin-notice">
      {{ error }}
    </p>

    <div class="admin-card overflow-hidden">
      <DataTable :columns="columns" :rows="items" empty-label="No blog posts yet." @row-click="openRow">
        <template #cell-status="{ row }"><StatusStamp :status="row.status || 'draft'" /></template>
      </DataTable>
    </div>

    <p class="text-xs text-romara-ink/50 mt-3">Published posts appear on the live site immediately.</p>

    <SlideOver :open="drawerOpen" :title="active?.id ? 'Edit post' : 'New post'" @close="drawerOpen = false">
      <form v-if="active" class="space-y-4" @submit.prevent="save">
        <p v-if="error" class="admin-notice">
          {{ error }}
        </p>

        <div>
          <label class="admin-label">Title</label>
          <input v-model="active.title" required @input="onTitleInput"
            class="admin-input" />
        </div>

        <div>
          <label class="admin-label">URL slug</label>
          <input v-model="active.slug" required
            class="admin-input font-mono" />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="admin-label">Category</label>
            <select v-model="active.category"
              class="admin-input">
              <option v-for="c in categories" :key="c.value" :value="c.value">{{ c.label }}</option>
            </select>
          </div>
          <div>
            <label class="admin-label">Read time (min)</label>
            <input v-model.number="active.read_time_minutes" type="number" min="1"
              class="admin-input" />
          </div>
        </div>

        <div>
          <label class="admin-label">Excerpt</label>
          <textarea v-model="active.excerpt" rows="3" placeholder="Shown on the blog card."
            class="admin-input" />
        </div>

        <div>
          <label class="admin-label">Content</label>
          <textarea v-model="active.content" rows="10" placeholder="The full article."
            class="admin-input" />
        </div>

        <div>
          <label class="admin-label">Cover image</label>
          <div v-if="active.featured_image_url" class="mb-2 w-32 aspect-[4/3] rounded-card overflow-hidden border border-romara-ink/10">
            <img :src="active.featured_image_url" class="w-full h-full object-cover" alt="Cover" />
          </div>
          <label class="inline-flex items-center gap-2 text-sm text-romara-amber font-medium cursor-pointer">
            <input type="file" accept="image/*" class="hidden" @change="uploadCover" />
            {{ uploading ? 'Uploading…' : active.featured_image_url ? '+ Replace image' : '+ Upload image' }}
          </label>
        </div>

        <label class="flex items-center gap-2.5">
          <input v-model="active.featured" type="checkbox" class="w-4 h-4 rounded border-romara-ink/10 text-romara-amber focus:ring-romara-amber" />
          <span class="text-sm text-romara-ink">Featured (shown in Featured Stories)</span>
        </label>

        <div>
          <label class="admin-label">Status</label>
          <select v-model="active.status"
            class="admin-input">
            <option value="draft">Draft — not on the site</option>
            <option value="published">Published — live on the site</option>
            <option value="archived">Archived — removed from the site</option>
          </select>
        </div>

        <div class="flex items-center justify-between pt-3 border-t border-romara-ink/10">
          <button v-if="active.id" type="button" class="text-romara-amber text-sm font-medium hover:underline" @click="remove">
            Delete post
          </button>
          <div v-else />
          <button type="submit" :disabled="saving"
            class="admin-btn">
            {{ saving ? 'Saving…' : 'Save post' }}
          </button>
        </div>
      </form>
    </SlideOver>
  </div>
</template>
