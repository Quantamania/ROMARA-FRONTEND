<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/shared/api/supabaseClient'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => route.params.id && route.params.id !== 'new')

const form = ref({
  title: '', slug: '', description: '', price_kes: 0,
  duration_days: 1, images: [] as string[], published: false,
})
const uploading = ref(false)
const saving = ref(false)
const deleting = ref(false)

onMounted(async () => {
  if (isEdit.value) {
    const { data } = await supabase.from('tour_packages').select('*').eq('id', route.params.id).single()
    if (data) form.value = data
  }
})

function slugify(title: string) {
  return title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
}

function onTitleInput() {
  if (!isEdit.value) form.value.slug = slugify(form.value.title)
}

async function handleImageUpload(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (!files?.length) return
  uploading.value = true
  for (const file of Array.from(files)) {
    const path = `${Date.now()}-${file.name}`
    const { error } = await supabase.storage.from('tour-images').upload(path, file)
    if (!error) {
      const { data } = supabase.storage.from('tour-images').getPublicUrl(path)
      form.value.images.push(data.publicUrl)
    }
  }
  uploading.value = false
}

function removeImage(url: string) {
  form.value.images = form.value.images.filter((i) => i !== url)
}

async function handleSave() {
  saving.value = true
  const payload = { ...form.value }
  const { error } = isEdit.value
    ? await supabase.from('tour_packages').update(payload).eq('id', route.params.id)
    : await supabase.from('tour_packages').insert(payload)

  saving.value = false
  if (!error) router.push('/admin/tours')
}

async function handleDelete() {
  if (!confirm('Delete this tour package? This cannot be undone.')) return
  deleting.value = true
  await supabase.from('tour_packages').delete().eq('id', route.params.id)
  router.push('/admin/tours')
}
</script>

<template>
  <div class="max-w-2xl">
    <div class="flex items-center gap-3 mb-6">
      <RouterLink to="/admin/tours" class="text-ink-light hover:text-ink">← Back</RouterLink>
    </div>
    <h1 class="font-display text-3xl text-ink mb-6">
      {{ isEdit ? 'Edit tour package' : 'New tour package' }}
    </h1>

    <form class="space-y-5 bg-white border border-sand-300 rounded-xl p-6" @submit.prevent="handleSave">
      <div>
        <label class="block text-sm font-medium text-ink mb-1.5">Title</label>
        <input
          v-model="form.title" required @input="onTitleInput"
          class="w-full rounded-lg border border-sand-300 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-terracotta"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-ink mb-1.5">URL slug</label>
        <input
          v-model="form.slug" required
          class="w-full rounded-lg border border-sand-300 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-terracotta font-mono text-sm"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-ink mb-1.5">Description</label>
        <textarea
          v-model="form.description" rows="4"
          class="w-full rounded-lg border border-sand-300 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-terracotta"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-ink mb-1.5">Price (KES)</label>
          <input
            v-model.number="form.price_kes" type="number" min="0" required
            class="w-full rounded-lg border border-sand-300 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-terracotta"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-ink mb-1.5">Duration (days)</label>
          <input
            v-model.number="form.duration_days" type="number" min="1" required
            class="w-full rounded-lg border border-sand-300 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-terracotta"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-ink mb-1.5">Photos</label>
        <div class="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
          <div v-for="img in form.images" :key="img" class="relative group aspect-square rounded-lg overflow-hidden border border-sand-300">
            <img :src="img" class="w-full h-full object-cover" alt="Tour photo" />
            <button
              type="button" aria-label="Remove photo"
              class="absolute top-1 right-1 w-6 h-6 bg-ink/70 text-white rounded-full text-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              @click="removeImage(img)"
            >×</button>
          </div>
        </div>
        <label class="inline-flex items-center gap-2 text-sm text-terracotta font-medium cursor-pointer hover:text-terracotta-dark">
          <input type="file" accept="image/*" multiple class="hidden" @change="handleImageUpload" />
          {{ uploading ? 'Uploading…' : '+ Upload photos' }}
        </label>
      </div>

      <label class="flex items-center gap-2.5">
        <input v-model="form.published" type="checkbox" class="w-4 h-4 rounded border-sand-300 text-terracotta focus:ring-terracotta" />
        <span class="text-sm text-ink">Published (visible on the live site)</span>
      </label>

      <div class="flex items-center justify-between pt-4 border-t border-sand-200">
        <button
          v-if="isEdit" type="button" :disabled="deleting"
          class="text-terracotta-dark text-sm font-medium hover:underline disabled:opacity-50"
          @click="handleDelete"
        >
          Delete tour
        </button>
        <div v-else />
        <button
          type="submit" :disabled="saving"
          class="bg-terracotta hover:bg-terracotta-dark text-white font-medium rounded-lg px-6 py-2.5 transition-colors disabled:opacity-60"
        >
          {{ saving ? 'Saving…' : 'Save tour' }}
        </button>
      </div>
    </form>
  </div>
</template>
