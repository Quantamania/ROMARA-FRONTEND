<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'outline' | 'amber' | 'ghost'
  size?: 'md' | 'lg'
  as?: 'button' | 'a'
  href?: string
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  as: 'button',
  href: undefined,
})

const variantClasses: Record<string, string> = {
  primary: 'bg-romara-green text-white hover:bg-romara-green/90',
  outline: 'bg-white text-romara-green border border-romara-green/20 hover:bg-romara-cream',
  amber: 'bg-romara-amber text-white hover:bg-romara-amber/90',
  // For buttons sitting on a dark/green background alongside a solid primary button —
  // e.g. the "Chat on WhatsApp" button in CallToActionBar's green theme.
  ghost: 'bg-white/10 text-white border border-white/25 hover:bg-white/20',
}

const sizeClasses: Record<string, string> = {
  md: 'px-5 py-3 text-sm',
  lg: 'px-6 py-3.5 text-sm',
}
</script>

<template>
  <component
    :is="as"
    :href="as === 'a' ? href : undefined"
    :class="[variantClasses[variant], sizeClasses[size]]"
    class="inline-flex justify-center items-center gap-2 rounded-md font-semibold uppercase tracking-wide transition-colors btn-hover"
  >
    <slot />
  </component>
</template>