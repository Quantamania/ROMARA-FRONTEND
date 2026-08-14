<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import IconStar from '@/components/icons/IconStar.vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import testimonialsData from '@/data/testimonials.json'
import { getAllTestimonials } from '@/features/testimonials/testimonials.api'
import type { Testimonial } from '@/types/testimonial.types'

const testimonials = ref<Testimonial[]>(testimonialsData as Testimonial[])
onMounted(async () => {
  const fromDb = await getAllTestimonials()
  if (fromDb.length) { testimonials.value = fromDb; activeIndex.value = 0 }
})
const activeIndex = ref(0)

const active = computed(() => testimonials.value[activeIndex.value])
const counter = computed(() => String(activeIndex.value + 1).padStart(2, '0'))
const total = computed(() => String(testimonials.value.length).padStart(2, '0'))

function next() {
  activeIndex.value = (activeIndex.value + 1) % testimonials.value.length
}
function prev() {
  activeIndex.value = (activeIndex.value - 1 + testimonials.value.length) % testimonials.value.length
}
</script>

<template>
  <div class="relative flex h-full flex-col overflow-hidden rounded-card bg-green-fade p-8 text-white shadow-elevated sm:p-10">
    <!-- Oversized decorative quote mark -->
    <span
      class="pointer-events-none absolute -right-2 -top-6 select-none font-heading text-[10rem] leading-none text-white/5"
      aria-hidden="true"
    >&rdquo;</span>

    <!-- Header + arrow controls -->
    <div class="relative flex items-start justify-between gap-4">
      <div>
        <p class="eyebrow text-romara-amber-300">Traveller Stories</p>
        <h2 class="mt-3 font-heading text-2xl font-semibold text-white">What our clients say</h2>
      </div>

      <div v-if="testimonials.length > 1" class="flex shrink-0 items-center gap-2">
        <button
          type="button"
          aria-label="Previous story"
          class="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-300 hover:border-romara-amber hover:bg-romara-amber hover:text-white"
          @click="prev"
        >
          <IconArrowLeft class="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Next story"
          class="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-300 hover:border-romara-amber hover:bg-romara-amber hover:text-white"
          @click="next"
        >
          <IconArrowRight class="h-4 w-4" />
        </button>
      </div>
    </div>

    <p v-if="!active" class="relative mt-8 text-sm text-white/60">Client reviews are coming soon.</p>

    <!-- Current story (compact) -->
    <div v-else class="relative mt-8 flex flex-1 flex-col">
      <div class="mb-4 flex gap-0.5 text-romara-amber">
        <IconStar v-for="star in active.rating" :key="star" class="h-4 w-4" />
      </div>

      <p class="font-heading text-lg leading-relaxed text-white/90 line-clamp-4 sm:text-xl">
        &ldquo;{{ active.quote }}&rdquo;
      </p>

      <div class="mt-auto flex items-center justify-between gap-4 pt-6">
        <div class="flex items-center gap-3.5">
          <img
            :src="active.avatar"
            :alt="active.name"
            class="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-romara-amber/60"
          />
          <div>
            <p class="text-sm font-bold text-white">{{ active.name }}</p>
            <p class="text-xs text-white/60">{{ active.location }}</p>
          </div>
        </div>

        <span v-if="testimonials.length > 1" class="shrink-0 font-heading text-sm font-semibold text-white/40">
          {{ counter }} <span class="text-white/25">/ {{ total }}</span>
        </span>
      </div>
    </div>
  </div>
</template>
