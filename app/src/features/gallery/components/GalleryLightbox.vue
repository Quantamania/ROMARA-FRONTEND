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
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
        @click.self="emit('close')"
      >
        <button
          type="button"
          aria-label="Close"
          class="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          @click="emit('close')"
        >
          <IconX class="h-5 w-5" />
        </button>

        <button
          type="button"
          aria-label="Previous image"
          class="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
          @click="emit('prev')"
        >
          <IconChevronLeft class="h-5 w-5" />
        </button>

        <button
          type="button"
          aria-label="Next image"
          class="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
          @click="emit('next')"
        >
          <IconChevronRight class="h-5 w-5" />
        </button>

        <div class="max-h-[85vh] max-w-4xl">
          <img :src="activeImage.src" :alt="activeImage.alt" class="max-h-[75vh] w-full rounded-lg object-contain" />
          <div class="mt-4 flex items-center justify-between gap-4 text-white">
            <p class="text-sm">{{ activeImage.caption }}</p>
            <p class="shrink-0 text-xs text-white/60">{{ (activeIndex ?? 0) + 1 }} / {{ images.length }}</p>
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