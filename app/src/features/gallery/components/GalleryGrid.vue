<script setup lang="ts">
import IconExpand from '@/components/icons/IconExpand.vue'
import type { GalleryImage } from '@/features/gallery/api/gallery.api'

interface Props {
  images: GalleryImage[]
  hasMore: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  'open-image': [image: GalleryImage]
  'load-more': []
}>()

function openImage(image: GalleryImage) {
  emit('open-image', image)
}

function loadMore() {
  emit('load-more')
}
 
function formatSrc(src: string) {
  try {
    return encodeURI(src)
  } catch (e) {
    return src
  }
}
</script>

<template>
  <div>
    <!-- True masonry via CSS columns — items keep their natural aspect ratio
         instead of being cropped into a uniform grid, so the layout has real
         visual variety rather than a flat rows-and-columns feel. -->
    <div class="columns-2 gap-3 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-5">
      <button
        v-for="(image, index) in images"
        :key="image.id"
        type="button"
        class="group relative mb-3 block w-full overflow-hidden break-inside-avoid transition-transform duration-300 hover:scale-[1.01] focus:outline-none sm:mb-5"
        v-scroll-reveal="{ delay: (index % 6) * 80 }"
        @click="openImage(image)"
      >
        <img :src="formatSrc(image.src)" :alt="image.alt" class="w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />

        <!-- Gradient scrim + caption reveal -->
        <div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:p-5">
          <span class="mb-3 flex h-10 w-10 translate-y-2 items-center justify-center self-end rounded-full bg-white/95 text-romara-green shadow-soft transition-transform duration-500 ease-out-expo group-hover:translate-y-0">
            <IconExpand class="h-4 w-4" />
          </span>
          <span class="mb-2 inline-flex w-fit items-center gap-1.5 text-eyebrow font-bold uppercase tracking-[0.14em] text-romara-amber-300">
            
            {{ image.category }}
          </span>
          <p class="translate-y-2 text-left font-heading text-base font-medium leading-snug text-white transition-transform duration-500 ease-out-expo group-hover:translate-y-0">
            {{ image.caption }}
          </p>
        </div>
      </button>
    </div>

    <div v-if="hasMore" class="mt-12 flex justify-center">
      <button
        type="button"
        class="group inline-flex items-center gap-2.5 rounded-full border border-romara-green/30 bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-romara-green shadow-soft transition-all duration-300 ease-out-expo hover:border-romara-green hover:bg-romara-green hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-romara-amber"
        @click="loadMore"
      >
        Load More Photos
      </button>
    </div>
  </div>
</template>