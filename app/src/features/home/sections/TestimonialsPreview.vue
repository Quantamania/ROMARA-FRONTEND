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
  <div class="rounded-lg bg-romara-cream p-6 sm:p-8">
    <h2 class="text-xl font-bold text-romara-green">What Our Clients Say</h2>

    <p v-if="testimonials.length === 0" class="mt-6 text-sm text-romara-ink/60">
      Client reviews are coming soon.
    </p>

    <div
      v-for="(testimonial, index) in testimonials"
      v-show="index === activeTestimonialIndex"
      :key="testimonial.id"
      class="mt-6"
    >
      <div class="flex items-start gap-4">
        <img :src="testimonial.avatar" :alt="testimonial.name" class="h-14 w-14 shrink-0 rounded-full object-cover" />
        <div>
          <p class="text-sm italic leading-relaxed text-romara-ink/80">&ldquo;{{ testimonial.quote }}&rdquo;</p>
          <p class="mt-3 text-sm font-bold text-romara-green">{{ testimonial.name }}</p>
          <p class="text-xs text-romara-ink/50">{{ testimonial.location }}</p>
          <div class="mt-1 flex gap-0.5 text-romara-amber">
            <IconStar v-for="star in testimonial.rating" :key="star" class="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="testimonials.length > 1" class="mt-6 flex gap-2">
      <button
        v-for="(testimonial, index) in testimonials"
        :key="testimonial.id"
        type="button"
        :aria-label="`Show testimonial ${index + 1}`"
        class="h-2 w-2 rounded-full"
        :class="index === activeTestimonialIndex ? 'bg-romara-amber' : 'bg-romara-ink/20'"
        @click="goToTestimonial(index)"
      />
    </div>
  </div>
</template>