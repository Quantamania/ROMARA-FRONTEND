<script setup lang="ts">
import IconArrowRight from '@/components/icons/IconArrowRight.vue'

interface Props {
  title: string
  /** Small gold kicker shown above the title. */
  eyebrow?: string
  /** Supporting line shown under the title. */
  description?: string
  linkText?: string
  linkHref?: string
  align?: 'left' | 'center'
  /** Use on dark/green backgrounds to flip text colors to light. */
  invert?: boolean
}

withDefaults(defineProps<Props>(), {
  eyebrow: undefined,
  description: undefined,
  linkText: undefined,
  linkHref: undefined,
  align: 'left',
  invert: false,
})
</script>

<template>
  <div
    class="mb-10 flex gap-4"
    :class="align === 'center'
      ? 'flex-col items-center text-center'
      : 'flex-col sm:flex-row sm:items-end sm:justify-between'"
  >
    <div :class="align === 'center' ? 'max-w-2xl' : ''">
      <p v-if="eyebrow" class="eyebrow mb-3" :class="align === 'center' ? 'justify-center' : ''">
        
        {{ eyebrow }}
      </p>

      <h2
        class="font-heading text-display-sm font-semibold"
        :class="invert ? 'text-white' : 'text-romara-green'"
      >
        {{ title }}
      </h2>

      <span class="accent-rule mt-4" :class="align === 'center' ? 'mx-auto' : ''" />

      <p
        v-if="description"
        class="mt-4 max-w-xl text-sm leading-relaxed"
        :class="[invert ? 'text-white/70' : 'text-romara-ink-soft', align === 'center' ? 'mx-auto' : '']"
      >
        {{ description }}
      </p>
    </div>

    <a
      v-if="linkText"
      :href="linkHref ?? '#'"
      class="group inline-flex shrink-0 items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] transition-colors"
      :class="invert ? 'text-white hover:text-romara-amber' : 'text-romara-green hover:text-romara-amber'"
    >
      {{ linkText }}
      <IconArrowRight class="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
    </a>
  </div>
</template>
