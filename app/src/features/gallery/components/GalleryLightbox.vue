<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue'
import IconX from '@/components/icons/IconX.vue'
import IconChevronLeft from '@/components/icons/IconChevronLeft.vue'
import IconChevronRight from '@/components/icons/IconChevronRight.vue'
import type { GalleryImage } from '@/features/gallery/api/gallery.api'

interface Props {
  images: GalleryImage[]
  activeIndex: number | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  prev: []
  next: []
}>()

const isOpen = computed(function checkIsOpen() {
  return props.activeIndex !== null
})

const activeImage = computed(function getActiveImage() {
  return props.activeIndex !== null ? props.images[props.activeIndex] : null
})

function handleKeydown(event: KeyboardEvent) {
  if (!isOpen.value) return
  if (event.key === 'Escape') emit('close')
  if (event.key === 'ArrowLeft') emit('prev')
  if (event.key === 'ArrowRight') emit('next')
}

onMounted(function addKeyListener() {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(function removeKeyListener() {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox-fade">
      <div
        v-if="isOpen && activeImage"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-romara-green-dark/95 p-4 backdrop-blur-sm sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer"
        @click.self="emit('close')"
      >
        <button
          type="button"
          aria-label="Close"
          class="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors duration-300 hover:bg-romara-amber hover:text-romara-green focus:outline-none focus-visible:ring-2 focus-visible:ring-romara-amber sm:right-6 sm:top-6"
          @click="emit('close')"
        >
          <IconX class="h-5 w-5" />
        </button>

        <button
          type="button"
          aria-label="Previous image"
          class="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors duration-300 hover:bg-romara-amber hover:text-romara-green focus:outline-none focus-visible:ring-2 focus-visible:ring-romara-amber sm:left-6"
          @click="emit('prev')"
        >
          <IconChevronLeft class="h-5 w-5" />
        </button>

        <button
          type="button"
          aria-label="Next image"
          class="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors duration-300 hover:bg-romara-amber hover:text-romara-green focus:outline-none focus-visible:ring-2 focus-visible:ring-romara-amber sm:right-6"
          @click="emit('next')"
        >
          <IconChevronRight class="h-5 w-5" />
        </button>

        <div class="flex max-h-[88vh] max-w-4xl flex-col">
          <img :src="activeImage.src" :alt="activeImage.alt" class="max-h-[74vh] w-full rounded-card object-contain shadow-elevated" />
          <div class="mt-5 flex items-center justify-between gap-4 text-white">
            <div class="min-w-0">
              <span class="mb-1.5 inline-flex items-center gap-1.5 text-eyebrow font-bold uppercase tracking-[0.14em] text-romara-amber-300">
                
                {{ activeImage.category }}
              </span>
              <p class="font-heading text-base leading-snug text-white/90 sm:text-lg">{{ activeImage.caption }}</p>
            </div>
            <p class="shrink-0 font-heading text-sm text-white/60">
              <span class="text-white">{{ (activeIndex ?? 0) + 1 }}</span> / {{ images.length }}
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.25s ease;
}
.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}
</style>