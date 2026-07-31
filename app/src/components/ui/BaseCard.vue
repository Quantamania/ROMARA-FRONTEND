<script setup lang="ts">
/**
 * Generic surface used for content cards across the site.
 * Keep it presentational — feature cards (PackageCard, DestinationCard…) can
 * either use this as a shell or bring their own markup.
 */
interface Props {
  as?: 'div' | 'article' | 'a'
  href?: string
  /** Adds the lift-on-hover interaction. */
  hover?: boolean
  /** 'default' = white surface, 'cream' = warm surface, 'outline' = bordered. */
  surface?: 'default' | 'cream' | 'outline'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<Props>(), {
  as: 'div',
  href: undefined,
  hover: false,
  surface: 'default',
  padding: 'md',
})

const surfaceClasses: Record<string, string> = {
  default: 'bg-white shadow-card',
  cream: 'bg-romara-cream',
  outline: 'bg-white border border-romara-green/10',
}

const paddingClasses: Record<string, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}
</script>

<template>
  <component
    :is="as"
    :href="as === 'a' ? href : undefined"
    :class="[
      surfaceClasses[surface],
      paddingClasses[padding],
      hover ? 'transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-elevated' : '',
    ]"
    class="relative overflow-hidden rounded-card"
  >
    <slot />
  </component>
</template>
