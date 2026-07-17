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
  <article class="group flex flex-col bg-white shadow-card rounded-lg h-full overflow-hidden card-hover">
    <div
      class="relative overflow-hidden"
      :class="props.featured ? 'min-h-[280px] flex-1 lg:min-h-[320px]' : 'h-56'"
    >
      <img
        :src="props.destination.image"
        :alt="props.destination.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

      <div class="bottom-0 absolute inset-x-0" :class="props.featured ? 'p-6' : 'p-4'">
        <h3 class="font-heading font-bold text-white" :class="props.featured ? 'text-2xl' : 'text-lg'">
          {{ props.destination.name }}
        </h3>
        <p class="flex items-center gap-1 mt-1 text-white/80" :class="props.featured ? 'text-sm' : 'text-xs'">
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
        class="flex justify-center items-center gap-1 bg-romara-green hover:bg-romara-green/90 mt-4 py-2.5 rounded-md font-semibold text-white text-xs uppercase tracking-wide"
      >
        Explore
        <IconChevronRight class="w-3.5 h-3.5" />
      </a>
    </div>
  </article>
</template>