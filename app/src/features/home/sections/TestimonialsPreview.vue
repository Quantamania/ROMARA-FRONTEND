<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import IconStar from '@/components/icons/IconStar.vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import testimonialsData from '@/data/testimonials.json'
import { getAllTestimonials } from '@/features/testimonials/testimonials.api'
import type { Testimonial } from '@/types/testimonial.types'

// `card` wraps the block in a white panel (desktop). Mobile passes card=false
// so the reviews sit directly on the page background with no outer card.
const props = withDefaults(defineProps<{ card?: boolean }>(), { card: true })

const testimonials = ref<Testimonial[]>(testimonialsData as Testimonial[])
onMounted(async () => {
  const fromDb = await getAllTestimonials()
  if (fromDb.length) { testimonials.value = fromDb; activeIndex.value = 0 }
})
const activeIndex = ref(0)

const active = computed(() => testimonials.value[activeIndex.value])

function next() {
  activeIndex.value = (activeIndex.value + 1) % testimonials.value.length
}
function prev() {
  activeIndex.value = (activeIndex.value - 1 + testimonials.value.length) % testimonials.value.length
}
function goTo(i: number) {
  activeIndex.value = i
}
</script>

<template>
  <div :class="props.card ? 'rounded-card bg-white p-4 shadow-card sm:p-6' : ''">
    <h2 class="text-center font-heading text-xl font-bold text-romara-green sm:text-2xl">What Our Guests Say</h2>

    <p v-if="!active" class="mt-6 text-center text-sm text-romara-ink/50">Client reviews are coming soon.</p>

    <div v-else class="mt-5 flex items-center gap-1.5 sm:gap-3">
      <button
        type="button"
        aria-label="Previous review"
        class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-romara-green/60 transition-colors hover:bg-romara-bone hover:text-romara-amber"
        @click="prev"
      >
        <IconArrowLeft class="h-5 w-5" />
      </button>

      <div class="min-w-0 flex-1 rounded-lg border border-romara-green/10 bg-romara-bone/40 p-4">
        <div class="flex gap-3.5">
          <img
            :src="active.avatar"
            :alt="active.name"
            class="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-romara-amber/50"
          />
          <div class="min-w-0">
            <div class="flex gap-0.5 text-romara-amber">
              <IconStar v-for="n in active.rating" :key="n" class="h-4 w-4" />
            </div>
            <p class="mt-1.5 text-sm leading-relaxed text-romara-ink/80">&ldquo;{{ active.quote }}&rdquo;</p>
            <p class="mt-2 text-sm font-bold text-romara-green">&ndash; {{ active.name }}, {{ active.location }}</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label="Next review"
        class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-romara-green/60 transition-colors hover:bg-romara-bone hover:text-romara-amber"
        @click="next"
      >
        <IconArrowRight class="h-5 w-5" />
      </button>
    </div>

    <div v-if="active && testimonials.length > 1" class="mt-4 flex justify-center gap-2">
      <button
        v-for="(t, i) in testimonials"
        :key="t.id"
        type="button"
        :aria-label="`Show review ${i + 1}`"
        class="h-2 w-2 rounded-full transition-colors duration-300"
        :class="i === activeIndex ? 'bg-romara-green' : 'bg-romara-green/25 hover:bg-romara-green/50'"
        @click="goTo(i)"
      />
    </div>
  </div>
</template>
