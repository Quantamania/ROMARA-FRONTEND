<script setup lang="ts">
import IconMapPin from '@/components/icons/IconMapPin.vue'
import IconChevronRight from '@/components/icons/IconChevronRight.vue'
import type { Destination } from '@/features/destinations/types/destination.types'

interface Props {
  destination: Destination
  featured?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  featured: false,
})
</script>

<template>
  <article class="group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-card">
    <div
      class="relative overflow-hidden"
      :class="props.featured ? 'min-h-[280px] flex-1 lg:min-h-[320px]' : 'h-56'"
    >
      <img
        :src="props.destination.image"
        :alt="props.destination.name"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

      <div class="absolute inset-x-0 bottom-0" :class="props.featured ? 'p-6' : 'p-4'">
        <h3 class="font-heading font-bold text-white" :class="props.featured ? 'text-2xl' : 'text-lg'">
          {{ props.destination.name }}
        </h3>
        <p class="mt-1 flex items-center gap-1 text-white/80" :class="props.featured ? 'text-sm' : 'text-xs'">
          <IconMapPin :class="props.featured ? 'h-4 w-4' : 'h-3.5 w-3.5'" />
          {{ props.destination.county }}
        </p>
      </div>
    </div>

    <div :class="props.featured ? 'p-6' : 'p-4'">
      <p class="text-romara-ink/70" :class="props.featured ? 'text-base' : 'text-sm'">
        {{ props.destination.description }}
      </p>

      <a
        :href="`/destinations/${props.destination.slug}`"
        class="mt-4 flex items-center justify-center gap-1 rounded-md bg-romara-green py-2.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-romara-green/90"
      >
        Explore
        <IconChevronRight class="h-3.5 w-3.5" />
      </a>
    </div>
  </article>
</template>