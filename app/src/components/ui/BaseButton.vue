<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'outline' | 'amber' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  as?: 'button' | 'a'
  href?: string
  block?: boolean
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  as: 'button',
  href: undefined,
  block: false,
  loading: false,
})

const variantClasses: Record<string, string> = {
  primary:
    'bg-romara-green text-white shadow-soft hover:bg-romara-green-700 hover:shadow-elevated focus-visible:ring-romara-green/40',
  outline:
    'bg-white text-romara-green border border-romara-green/20 hover:border-romara-green/40 hover:bg-romara-cream focus-visible:ring-romara-green/30',
  amber:
    'bg-amber-fade text-white shadow-soft hover:shadow-glow-amber focus-visible:ring-romara-amber/40',
  // For buttons sitting on a dark/green background alongside a solid primary button —
  // e.g. the "Chat on WhatsApp" button in CallToActionBar's green theme.
  ghost:
    'bg-white/10 text-white border border-white/25 backdrop-blur-sm hover:bg-white/20 focus-visible:ring-white/40',
  // Text-only call to action (arrow links etc.)
  link: 'bg-transparent px-0 text-romara-green hover:text-romara-amber focus-visible:ring-romara-amber/30',
}

const sizeClasses: Record<string, string> = {
  sm: 'px-4 py-2 text-[11px]',
  md: 'px-5 py-3 text-xs',
  lg: 'px-7 py-3.5 text-sm',
}
</script>

<template>
  <component
    :is="as"
    :href="as === 'a' ? href : undefined"
    :aria-busy="loading || undefined"
    :class="[variantClasses[variant], sizeClasses[size], block ? 'w-full' : '']"
    class="group relative inline-flex items-center justify-center gap-2 rounded-lg font-semibold uppercase tracking-[0.14em] transition-all duration-300 ease-out-expo focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60"
  >
    <span
      v-if="loading"
      class="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
      aria-hidden="true"
    />
    <span class="inline-flex items-center gap-2 transition-transform duration-300 ease-out-expo group-hover:-translate-y-px">
      <slot />
    </span>
  </component>
</template>
