<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import IconStar from '@/components/icons/IconStar.vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import testimonialsData from '@/data/testimonials.json'
import { getAllTestimonials } from '@/features/testimonials/testimonials.api'
import type { Testimonial } from '@/types/testimonial.types'

// `card` wraps the block in a white panel. Mobile passes card=false so the
// review sits in a light card on the page. `bare` drops every container so the
// content sits straight on the section background (used in the Why ROMARA grid).
const props = withDefaults(defineProps<{ card?: boolean; bare?: boolean }>(), {
  card: true,
  bare: false,
})

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
  <div :class="props.bare ? 'flex h-full flex-col' : props.card ? 'flex h-full flex-col rounded-card bg-white p-5 shadow-card sm:p-7' : ''">
    <h2
      class="font-heading text-xl font-bold text-romara-green sm:text-2xl"
      :class="props.bare || props.card ? 'text-center lg:text-left' : 'text-center'"
    >
      What Our Guests Say
    </h2>
    <span v-if="props.bare || props.card" class="accent-rule mt-4 hidden lg:block" />

    <p v-if="!active" class="mt-6 text-center text-sm text-romara-ink/50">Client reviews are coming soon.</p>

    <!-- Review: avatar + stars/name on top, quote below. Arrows on hover. -->
    <div
      v-else
      class="group relative"
      :class="props.bare || props.card ? 'mt-6 flex flex-1 flex-col justify-center' : 'mt-4 sm:mt-5'"
    >
      <div
        :class="props.bare
          ? 'border-t border-romara-green/12 pt-6'
          : props.card
            ? 'rounded-2xl border border-romara-green/10 bg-romara-bone/40 p-4 sm:p-5'
            : 'rounded-2xl border border-romara-green/10 bg-white p-4 shadow-soft sm:p-5'"
      >
        <div class="flex items-center gap-3">
          <img
            :src="active.avatar"
            :alt="active.name"
            class="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-romara-amber/40"
          />
          <div class="min-w-0">
            <div class="flex gap-0.5 text-romara-amber">
              <IconStar v-for="n in active.rating" :key="n" class="h-4 w-4" />
            </div>
            <p class="mt-1 truncate text-sm font-bold text-romara-green">{{ active.name }}, {{ active.location }}</p>
          </div>
        </div>

        <p
          class="mt-3.5 leading-relaxed text-romara-ink/75"
          :class="props.bare || props.card ? 'text-sm lg:text-base' : 'text-[13px] sm:text-sm'"
        >&ldquo;{{ active.quote }}&rdquo;</p>
      </div>

      <!-- Prev / next — only revealed while hovering the section -->
      <button
        v-if="testimonials.length > 1"
        type="button"
        aria-label="Previous review"
        class="absolute -left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-romara-green/10 bg-white text-romara-green opacity-0 shadow-card transition-all duration-300 ease-out-expo hover:text-romara-amber group-hover:opacity-100 focus-visible:opacity-100 sm:-left-3"
        @click="prev"
      >
        <IconArrowLeft class="h-4 w-4" />
      </button>
      <button
        v-if="testimonials.length > 1"
        type="button"
        aria-label="Next review"
        class="absolute -right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-romara-green/10 bg-white text-romara-green opacity-0 shadow-card transition-all duration-300 ease-out-expo hover:text-romara-amber group-hover:opacity-100 focus-visible:opacity-100 sm:-right-3"
        @click="next"
      >
        <IconArrowRight class="h-4 w-4" />
      </button>
    </div>

    <div
      v-if="active && testimonials.length > 1"
      class="flex justify-center gap-2"
      :class="props.bare || props.card ? 'mt-6 lg:justify-start' : 'mt-4'"
    >
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
