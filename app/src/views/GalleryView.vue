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
  <section class="relative isolate overflow-hidden bg-romara-green text-white min-h-screen">
    <div class="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-1">
      <img :src="mosaicImages[0].src" :alt="mosaicImages[0].alt" class="col-span-2 row-span-2 h-full w-full object-cover" />
      <img :src="mosaicImages[1].src" :alt="mosaicImages[1].alt" class="h-full w-full object-cover" />
      <img :src="mosaicImages[2].src" :alt="mosaicImages[2].alt" class="h-full w-full object-cover" />
      <img :src="mosaicImages[3].src" :alt="mosaicImages[3].alt" class="h-full w-full object-cover" />
      <img :src="mosaicImages[4].src" :alt="mosaicImages[4].alt" class="h-full w-full object-cover" />
    </div>
    <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />

    <div class="romara-container relative flex h-screen items-start justify-start pt-32 sm:pt-40 lg:pt-48">
      <div class="max-w-xl">
        <h1 class="font-heading text-4xl font-bold sm:text-5xl">Gallery</h1>
        <p class="mt-2 text-lg font-semibold text-romara-amber">Moments. Memories. Adventures.</p>
        <p class="mt-4 text-base leading-relaxed text-white/85">
          Explore breathtaking photos from our safaris, day trips, and travel experiences across Kenya. Every
          image tells a story.
        </p>

        <nav class="mt-6 flex items-center gap-2 text-xs text-white/70" aria-label="Breadcrumb">
          <a href="/" class="hover:text-white">Home</a>
          <span>/</span>
          <span class="text-white">Gallery</span>
        </nav>
      </div>
    </div>
  </section>

  <!-- Filter + masonry grid -->
  <section class="py-16 px-6 sm:px-8 lg:px-12">
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
  <section class="pb-16 px-6 sm:px-8 lg:px-12">
    <div class="relative min-h-[260px] overflow-hidden rounded-lg">
      <img
        src="/src/assets/images/gallery/lion.jpeg"
        alt="Lion at sunset"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-romara-green/95 via-romara-green/70 to-transparent" />

      <div class="relative flex h-full flex-col justify-center gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
        <div class="text-white">
          <h2 class="text-2xl font-bold sm:text-3xl">Ready for Your Next Adventure?</h2>
          <p class="mt-2 text-sm text-white/80">Let us help you create unforgettable memories.</p>
        </div>

        <div class="flex flex-wrap gap-3">
          <BaseButton as="a" href="/book-now" variant="amber">Book Your Safari</BaseButton>
          <BaseButton as="a" href="/contact" variant="outline">Request a Quote</BaseButton>
          <BaseButton as="a" href="https://wa.me/254700123456" variant="ghost">
            <IconWhatsapp class="h-4 w-4" />
            Chat on WhatsApp
          </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>