<script setup lang="ts">
import IconExpand from '@/components/icons/IconExpand.vue'
import type { GalleryImage } from '@/features/gallery/api/gallery.api'

interface Props {
  images: GalleryImage[]
  hasMore: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  'open-image': [index: number]
  'load-more': []
}>()

function openImage(index: number) {
  emit('open-image', index)
}

function loadMore() {
  emit('load-more')
}
</script>

<template>
  <div>
    <!-- True masonry via CSS columns — items keep their natural aspect ratio
         instead of being cropped into a uniform grid, so the layout has real
         visual variety rather than a flat rows-and-columns feel. -->
    <div class="columns-1 gap-5 sm:columns-2 lg:columns-3">
      <button
        v-for="(image, index) in images"
        :key="image.id"
        type="button"
        class="group relative mb-5 block w-full overflow-hidden rounded-lg break-inside-avoid shadow-card"
        v-scroll-reveal="{ delay: (index % 6) * 80 }"
        @click="openImage(index)"
      >
        <img :src="image.src" :alt="image.alt" class="w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />

        <div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/0 to-black/0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span class="mb-2 flex h-9 w-9 items-center justify-center self-end rounded-full bg-white/90 text-romara-green">
            <IconExpand class="h-4 w-4" />
          </span>
          <p class="text-left text-sm font-medium text-white">{{ image.caption }}</p>
        </div>
      </button>
    </div>

    <div v-if="hasMore" class="mt-4 flex justify-center">
      <button
        type="button"
        class="flex items-center gap-2 rounded-full border border-romara-green px-6 py-3 text-xs font-semibold uppercase tracking-wide text-romara-green transition-colors hover:bg-romara-green hover:text-white"
        @click="loadMore"
      >
        Load More Photos
      </button>
    </div>
  </div>
</template>