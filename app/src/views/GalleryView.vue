<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'
import GalleryCategoryFilter from '@/features/gallery/components/GalleryCategoryFilter.vue'
import GalleryGrid from '@/features/gallery/components/GalleryGrid.vue'
import GalleryLightbox from '@/features/gallery/components/GalleryLightbox.vue'
import galleryImagesData from '@/data/galleryImages.json'
import type { GalleryCategory, GalleryImage } from '@/features/gallery/api/gallery.api'

const allImages = galleryImagesData as GalleryImage[]
// Tiles for the full-bleed hero mosaic wall. 12 keeps the grid perfectly filled
// at 3 / 4 / 6 columns (mobile / tablet / desktop) with no ragged last row.
const mosaicImages = allImages.slice(0, 12)

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
  <!-- Hero: full-bleed PHOTO-MOSAIC WALL — a wall of gallery photos with the
       page title centered over a dark scrim, like stepping up to a photo wall. -->
  <section v-scroll-reveal class="isolate relative bg-romara-green min-h-[380px] sm:min-h-[480px] lg:min-h-[80vh] overflow-hidden text-white">
    <!-- The wall itself: a uniform tile grid (3 / 4 / 6 cols) that fills edge to
         edge. A single slow ken-burns drift across the whole wall is the one
         authored motion moment (auto-disabled under prefers-reduced-motion). -->
    <div class="ken-burns absolute inset-0 grid grid-cols-3 auto-rows-fr gap-1 sm:grid-cols-4 sm:gap-1.5 lg:grid-cols-6">
      <img
        v-for="image in mosaicImages"
        :key="image.id"
        :src="image.src"
        :alt="image.alt"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Layered dark scrim so the centered title stays legible over any tile -->
    <div class="absolute inset-0 bg-romara-green-dark/70" />
    <div class="absolute inset-0 bg-gradient-to-t from-romara-green-dark/85 via-romara-green-dark/45 to-romara-green-dark/80" />

    <div class="relative flex flex-col items-center justify-center min-h-[380px] sm:min-h-[480px] lg:min-h-[80vh] pt-20 pb-12 sm:pt-24 sm:pb-14 text-center romara-container">
      <nav class="mb-6 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-white/70 animate-fade-up" aria-label="Breadcrumb">
        <a href="/" class="transition-colors hover:text-romara-amber">Home</a>
        <span class="text-white/40">/</span>
        <span class="text-white/90">Gallery</span>
      </nav>

      <h1 class="font-heading text-display-lg font-semibold text-balance animate-fade-up" style="animation-delay: 90ms">
        Gallery
      </h1>

      <p class="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg animate-fade-up" style="animation-delay: 180ms">
        Explore breathtaking photos from our safaris, day trips, and travel experiences across Kenya. Every
        image tells a story.
      </p>
    </div>
  </section>

  <!-- Filter + masonry grid -->
  <section v-scroll-reveal-left class="section-y bg-romara-bone">
    <div class="romara-container">
      <SectionHeading
        eyebrow="Our Portfolio"
        title="A Journey Through the Lens"
        description="Browse by category to relive Kenya's wildlife, landscapes and cultures — every frame captured on a real ROMARA journey."
        align="center"
      />

      <div class="mb-12 mt-2">
        <GalleryCategoryFilter v-model="selectedCategory" />
      </div>

      <GalleryGrid
        :images="visibleImages"
        :has-more="hasMore"
        @open-image="openImage"
        @load-more="loadMore"
      />
    </div>
  </section>

  <GalleryLightbox
    :images="visibleImages"
    :active-index="activeIndex"
    @close="closeLightbox"
    @prev="showPrevImage"
    @next="showNextImage"
  />

  <!-- CTA: photo-backed banner, per the brief's "striking lion image" -->
  <section v-scroll-reveal-right class="relative isolate overflow-hidden">
    <img
      src="https://res.cloudinary.com/ry9vpche/image/upload/v1785232064/lion.jpeg"
      alt="Lion at sunset"
      class="ken-burns absolute inset-0 w-full h-full object-cover"
      loading="lazy"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-romara-green-dark/95 via-romara-green/75 to-romara-green/20" />
    <div class="absolute inset-0 bg-scrim-b" />
    <div class="relative romara-container">
      <div class="flex sm:flex-row flex-col justify-center sm:justify-between sm:items-center gap-8 py-16 sm:py-20 min-h-[340px]">
        <div class="sm:max-w-md text-white">
          <p class="eyebrow text-romara-amber-300">
            
            Start Planning
          </p>
          <h2 class="mt-4 font-heading text-display-sm font-semibold text-balance">Ready for Your Next Adventure?</h2>
          <p class="mt-4 text-white/80 text-base leading-relaxed">Let us help you turn these moments into your own unforgettable memories.</p>
        </div>

        <div class="flex sm:flex-row flex-col gap-4">
          <BaseButton as="a" href="/book-now" variant="amber" size="lg" class="w-full sm:w-auto">Book Your Safari</BaseButton>
          <div class="flex gap-3">
            <BaseButton as="a" href="/contact" variant="outline" size="lg" class="flex-1 sm:flex-none">Request a Quote</BaseButton>
            <BaseButton as="a" href="https://wa.me/254700123456" variant="ghost" size="lg" class="flex-1 sm:flex-none px-4">
              <IconWhatsapp class="w-5 h-5" />
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>