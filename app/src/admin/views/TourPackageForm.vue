<script setup lang="ts">
/**
 * Writes the columns tour_packages actually has. The previous version used
 * title / price_kes / duration_days / images / published, none of which exist,
 * so every save failed — and the error was swallowed rather than shown.
 * Every field here maps to something the public safari cards render.
 */
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/shared/api/supabaseClient'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => route.params.id && route.params.id !== 'new')

const form = ref({
  name: '',
  slug: '',
  description: '',
  price: 0,
  duration: 1,
  destination: '',
  image_url: '',
  badge: '',
  max_capacity: 12,
  available_slots: 12,
  is_published: false,
})

const uploading = ref(false)
const saving = ref(false)
const deleting = ref(false)
const loading = ref(false)
const error = ref('')

onMounted(async () => {
  if (!isEdit.value) return
  loading.value = true
  const { data, error: err } = await supabase
    .from('tour_packages')
    .select('*')
    .eq('id', route.params.id)
    .single()
  loading.value = false

  if (err) {
    error.value = err.message
    return
  }
  if (data) {
    form.value = {
      name: data.name ?? '',
      slug: data.slug ?? '',
      description: data.description ?? '',
      price: Number(data.price) || 0,
      duration: Number(data.duration) || 1,
      destination: data.destination ?? '',
      image_url: data.image_url ?? '',
      badge: data.badge ?? '',
      max_capacity: Number(data.max_capacity) || 12,
      available_slots: Number(data.available_slots) || 12,
      is_published: Boolean(data.is_published),
    }
  }
})

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
}

function onNameInput() {
  if (!isEdit.value) form.value.slug = slugify(form.value.name)
}

async function handleImageUpload(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  uploading.value = true
  error.value = ''

  const path = `${Date.now()}-${file.name.replace(/[^\w.-]/g, '_')}`
  const { error: upErr } = await supabase.storage.from('tour-images').upload(path, file)

  if (upErr) {
    error.value = `Image upload failed: ${upErr.message}`
  } else {
    const { data } = supabase.storage.from('tour-images').getPublicUrl(path)
    form.value.image_url = data.publicUrl
  }
  uploading.value = false
}

async function handleSave() {
  saving.value = true
  error.value = ''

  // The site resolves /safari-packages/:slug, so a tour without one is
  // unreachable even when published.
  if (!form.value.slug) form.value.slug = slugify(form.value.name)

  const payload = { ...form.value, badge: form.value.badge || null }

  const { error: err } = isEdit.value
    ? await supabase.from('tour_packages').update(payload).eq('id', route.params.id)
    : await supabase.from('tour_packages').insert(payload)

  saving.value = false

  if (err) {
    error.value = err.message.includes('tour_packages_slug_key')
      ? 'Another tour already uses that URL slug. Choose a different one.'
      : err.message
    return
  }
  router.push('/admin/tours')
}

async function handleDelete() {
  if (!confirm('Delete this tour package? It disappears from the live site immediately and cannot be undone.')) return
  deleting.value = true
  error.value = ''

  const { error: err } = await supabase.from('tour_packages').delete().eq('id', route.params.id)
  deleting.value = false

  if (err) {
    // Bookings hold tours down on purpose (migration 00017) so payment history
    // is never destroyed as a side effect.
    error.value = err.code === '23503'
      ? 'This tour has bookings against it, so it cannot be deleted. Untick "Published" to take it off the site instead.'
      : err.message
    return
  }
  router.push('/admin/tours')
}
</script>

<template>
  <div class="max-w-2xl">
    <div class="flex items-center gap-3 mb-6">
      <RouterLink to="/admin/tours" class="text-romara-ink/60 hover:text-romara-ink">← Back</RouterLink>
    </div>
    <p class="admin-eyebrow">Website content</p>
    <h1 class="admin-title">{{ isEdit ? 'Edit tour package' : 'New tour package' }}</h1>
    <span class="admin-title-rule" />

    <p v-if="error" class="mb-4 admin-notice">
      {{ error }}
    </p>

    <form class="space-y-5 admin-card p-6" @submit.prevent="handleSave">
      <div>
        <label class="admin-label">Name</label>
        <input
          v-model="form.name" required @input="onNameInput"
          placeholder="3-Day Maasai Mara Safari"
          class="admin-input"
        />
      </div>

      <div>
        <label class="admin-label">URL slug</label>
        <input
          v-model="form.slug" required
          class="admin-input font-mono text-sm"
        />
        <p class="text-xs text-romara-ink/50 mt-1">romaratours.com/safari-packages/{{ form.slug || '…' }}</p>
      </div>

      <div>
        <label class="admin-label">Description</label>
        <textarea
          v-model="form.description" rows="4"
          placeholder="Shown on the safari card and detail page."
          class="admin-input"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="admin-label">Price from (KES)</label>
          <input
            v-model.number="form.price" type="number" min="0" required
            class="admin-input"
          />
        </div>
        <div>
          <label class="admin-label">Duration (days)</label>
          <input
            v-model.number="form.duration" type="number" min="1" required
            class="admin-input"
          />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="admin-label">Destination</label>
          <input
            v-model="form.destination" required placeholder="Maasai Mara"
            class="admin-input"
          />
          <p class="text-xs text-romara-ink/50 mt-1">Also feeds the destination filter.</p>
        </div>
        <div>
          <label class="admin-label">Badge (optional)</label>
          <input
            v-model="form.badge" placeholder="Best Seller"
            class="admin-input"
          />
          <p class="text-xs text-romara-ink/50 mt-1">Ribbon on the card.</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="admin-label">Total seats</label>
          <input
            v-model.number="form.max_capacity" type="number" min="1"
            class="admin-input"
          />
        </div>
        <div>
          <label class="admin-label">Seats available</label>
          <input
            v-model.number="form.available_slots" type="number" min="0"
            class="admin-input"
          />
          <p class="text-xs text-romara-ink/50 mt-1">Drops automatically as people book.</p>
        </div>
      </div>

      <div>
        <label class="admin-label">Cover photo</label>
        <div v-if="form.image_url" class="mb-3 relative group w-40 aspect-[4/3] rounded-card overflow-hidden border border-romara-ink/10">
          <img :src="form.image_url" class="w-full h-full object-cover" alt="Tour cover" />
          <button
            type="button" aria-label="Remove photo"
            class="absolute top-1 right-1 w-6 h-6 bg-romara-green-dark/70 text-white rounded-full text-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            @click="form.image_url = ''"
          >×</button>
        </div>
        <label class="inline-flex items-center gap-2 text-sm text-romara-amber font-medium cursor-pointer">
          <input type="file" accept="image/*" class="hidden" @change="handleImageUpload" />
          {{ uploading ? 'Uploading…' : form.image_url ? '+ Replace photo' : '+ Upload photo' }}
        </label>
      </div>

      <label class="flex items-center gap-2.5">
        <input v-model="form.is_published" type="checkbox" class="w-4 h-4 rounded border-romara-ink/10 text-romara-amber focus:ring-romara-amber" />
        <span class="text-sm text-romara-ink">Published (visible on the live site)</span>
      </label>

      <div class="flex items-center justify-between pt-4 border-t border-romara-ink/10">
        <button
          v-if="isEdit" type="button" :disabled="deleting"
          class="text-romara-amber text-sm font-medium hover:underline disabled:opacity-50"
          @click="handleDelete"
        >
          {{ deleting ? 'Deleting…' : 'Delete tour' }}
        </button>
        <div v-else />
        <button
          type="submit" :disabled="saving || loading"
          class="admin-btn"
        >
          {{ saving ? 'Saving…' : 'Save tour' }}
        </button>
      </div>
    </form>
  </div>
</template>
