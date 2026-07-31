<script setup lang="ts">
import { ref } from 'vue'
import IconStar from '@/components/icons/IconStar.vue'
import testimonialsData from '@/data/testimonials.json'
import type { Testimonial } from '@/types/testimonial.types'

const testimonials = testimonialsData as Testimonial[]
const activeTestimonialIndex = ref(0)

function goToTestimonial(index: number) {
  activeTestimonialIndex.value = index
}
</script>

<template>
  <div class="relative flex h-full flex-col overflow-hidden rounded-card bg-green-fade p-8 text-white shadow-elevated sm:p-10">
    <!-- Oversized decorative quote mark -->
    <span
      class="pointer-events-none absolute -right-2 -top-6 select-none font-heading text-[10rem] leading-none text-white/5"
      aria-hidden="true"
    >&rdquo;</span>

    <p class="eyebrow text-romara-amber-300">
      <span class="h-px w-6 bg-romara-amber" />
      Traveller Stories
    </p>
    <h2 class="mt-3 font-heading text-2xl font-semibold text-white">What our clients say</h2>

    <p v-if="testimonials.length === 0" class="mt-8 text-sm text-white/60">
      Client reviews are coming soon.
    </p>

    <div class="relative mt-8 flex-1">
      <div
        v-for="(testimonial, index) in testimonials"
        v-show="index === activeTestimonialIndex"
        :key="testimonial.id"
      >
        <div class="mb-4 flex gap-0.5 text-romara-amber">
          <IconStar v-for="star in testimonial.rating" :key="star" class="h-4 w-4" />
        </div>

        <p class="font-heading text-lg leading-relaxed text-white/90 sm:text-xl">
          &ldquo;{{ testimonial.quote }}&rdquo;
        </p>

        <div class="mt-6 flex items-center gap-3.5">
          <img
            :src="testimonial.avatar"
            :alt="testimonial.name"
            class="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-romara-amber/60"
          />
          <div>
            <p class="text-sm font-bold text-white">{{ testimonial.name }}</p>
            <p class="text-xs text-white/60">{{ testimonial.location }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="testimonials.length > 1" class="mt-8 flex gap-2">
      <button
        v-for="(testimonial, index) in testimonials"
        :key="testimonial.id"
        type="button"
        :aria-label="`Show testimonial ${index + 1}`"
        class="h-1.5 rounded-full transition-all duration-500 ease-out-expo"
        :class="index === activeTestimonialIndex ? 'w-8 bg-romara-amber' : 'w-4 bg-white/25 hover:bg-white/50'"
        @click="goToTestimonial(index)"
      />
    </div>
  </div>
</template>
