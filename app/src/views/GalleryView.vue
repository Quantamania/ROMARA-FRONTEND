<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'
import GalleryCategoryFilter from '@/features/gallery/components/GalleryCategoryFilter.vue'
import GalleryGrid from '@/features/gallery/components/GalleryGrid.vue'
import GalleryLightbox from '@/features/gallery/components/GalleryLightbox.vue'
import galleryImagesData from '@/data/galleryImages.json'
import type { GalleryCategory, GalleryImage } from '@/features/gallery/api/gallery.api'

const allImages = galleryImagesData as GalleryImage[]
const mosaicImages = allImages.slice(0, 5)

const selectedCategory = ref<GalleryCategory | 'all'>('all')
const visibleCount = ref(9)
const activeIndex = ref<number | null>(null)

const filteredImages = computed(function getFilteredImages() {
  if (selectedCategory.value === 'all') return allImages
  return allImages.filter((image) => image.category === selectedCategory.value)
})

const visibleImages = computed(function getVisibleImages() {
  return filteredImages.value.slice(0, visibleCount.value)
})

const hasMore = computed(function checkHasMore() {
  return visibleCount.value < filteredImages.value.length
})

// Changing category starts the grid fresh and closes any open lightbox,
// since the previously-open image may no longer be in the filtered set.
watch(selectedCategory, function resetOnCategoryChange() {
  visibleCount.value = 9
  activeIndex.value = null
})

function loadMore() {
  visibleCount.value += 6
}

function openImage(index: number) {
  activeIndex.value = index
}

function closeLightbox() {
  activeIndex.value = null
}

function showPrevImage() {
  if (activeIndex.value === null) return
  activeIndex.value = activeIndex.value === 0 ? visibleImages.value.length - 1 : activeIndex.value - 1
}

function showNextImage() {
  if (activeIndex.value === null) return
  activeIndex.value = (activeIndex.value + 1) % visibleImages.value.length
}
</script>

<template>
  <!-- Hero: photo mosaic instead of a single image — fits a gallery page thematically -->
  <section v-scroll-reveal class="isolate relative bg-romara-green min-h-[680px] lg:min-h-screen overflow-hidden text-white">
    <div class="absolute inset-0 gap-1 grid grid-cols-2 grid-rows-3 sm:grid-cols-4 sm:grid-rows-2">
      <img :src="mosaicImages[0].src" :alt="mosaicImages[0].alt" class="col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 w-full h-full object-cover" />
      <img :src="mosaicImages[1].src" :alt="mosaicImages[1].alt" class="w-full h-full object-cover" />
      <img :src="mosaicImages[2].src" :alt="mosaicImages[2].alt" class="w-full h-full object-cover" />
      <img :src="mosaicImages[3].src" :alt="mosaicImages[3].alt" class="col-span-2 sm:col-span-1 w-full h-full object-cover" />
      <img :src="mosaicImages[4].src" :alt="mosaicImages[4].alt" class="col-span-2 sm:col-span-1 w-full h-full object-cover" />
    </div>
    <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />

    <div class="relative flex h-full items-end pt-24 sm:pt-32 lg:pt-40 romara-container">
      <div class="max-w-xl">
        <h1 class="font-heading font-bold text-4xl sm:text-5xl">Gallery</h1>
        <p class="mt-2 font-semibold text-romara-amber text-lg">Moments. Memories. Adventures.</p>
        <p class="mt-4 text-white/85 text-base leading-relaxed">
          Explore breathtaking photos from our safaris, day trips, and travel experiences across Kenya. Every
          image tells a story.
        </p>

        <nav class="flex items-center gap-2 mt-6 text-white/70 text-xs" aria-label="Breadcrumb">
          <a href="/" class="hover:text-white">Home</a>
          <span>/</span>
          <span class="text-white">Gallery</span>
        </nav>
      </div>
    </div>
  </section>

  <!-- Filter + masonry grid -->
  <section v-scroll-reveal-left class="px-6 sm:px-8 lg:px-12 py-16">
    <div class="mb-10">
      <GalleryCategoryFilter v-model="selectedCategory" />
    </div>

    <GalleryGrid
      :images="visibleImages"
      :has-more="hasMore"
      @open-image="openImage"
      @load-more="loadMore"
    />
  </section>

  <GalleryLightbox
    :images="visibleImages"
    :active-index="activeIndex"
    @close="closeLightbox"
    @prev="showPrevImage"
    @next="showNextImage"
  />

  <!-- CTA: photo-backed banner, per the brief's "striking lion image" -->
  <section v-scroll-reveal-right class="relative pt-14">
    <img
      src="https://res.cloudinary.com/ry9vpche/image/upload/v1785232064/lion.jpeg"
      alt="Lion at sunset"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-romara-green/95 via-romara-green/70 to-transparent" />
    <div class="right-0 bottom-0 left-0 absolute bg-gradient-to-t from-romara-green-dark to-transparent h-32" />
    <div class="relative romara-container">
      <div class="flex sm:flex-row flex-col justify-center sm:justify-between sm:items-center gap-8 p-10 sm:p-14 min-h-[320px]">
        <div class="sm:max-w-md text-white">
          <h2 class="font-bold text-3xl sm:text-4xl">Ready for Your Next Adventure?</h2>
          <p class="mt-3 text-white/80 text-base">Let us help you create unforgettable memories.</p>
        </div>

        <div class="flex sm:flex-row flex-col gap-4">
          <BaseButton as="a" href="/book-now" variant="amber" class="w-full sm:w-auto">Book Your Safari</BaseButton>
          <div class="flex gap-3">
            <BaseButton as="a" href="/contact" variant="outline" class="flex-1 sm:flex-none">Request a Quote</BaseButton>
            <BaseButton as="a" href="https://wa.me/254700123456" variant="ghost" class="flex-1 sm:flex-none px-4">
              <IconWhatsapp class="w-5 h-5" />
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>