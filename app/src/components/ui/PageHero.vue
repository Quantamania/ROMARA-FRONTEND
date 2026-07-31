<script setup lang="ts">
/**
 * Reusable inner-page hero. Gives every secondary page a consistent, premium
 * masthead: full-bleed image with a ken-burns drift, layered scrims, an eyebrow
 * kicker, an editorial display title, optional lead text, breadcrumb and slots
 * for actions / extra content (search bars, filters, stats…).
 */
interface Crumb {
  label: string
  href?: string
}

interface Props {
  title: string
  eyebrow?: string
  subtitle?: string
  image?: string
  /** Vertical size. */
  size?: 'sm' | 'md' | 'lg'
  align?: 'left' | 'center'
  breadcrumbs?: Crumb[]
}

withDefaults(defineProps<Props>(), {
  eyebrow: undefined,
  subtitle: undefined,
  image: undefined,
  size: 'md',
  align: 'left',
  breadcrumbs: undefined,
})

const sizeClasses: Record<string, string> = {
  sm: 'min-h-[340px] py-20',
  md: 'min-h-[440px] py-24',
  lg: 'min-h-[560px] py-28',
}
</script>

<template>
  <section class="relative isolate overflow-hidden bg-romara-green text-white">
    <img
      v-if="image"
      :src="image"
      :alt="title"
      class="ken-burns absolute inset-0 h-full w-full object-cover"
    />
    <div v-else class="absolute inset-0 bg-green-fade" />

    <!-- Scrims -->
    <div class="absolute inset-0 bg-scrim-b" />
    <div class="absolute inset-0 bg-gradient-to-r from-romara-green-dark/70 via-romara-green-dark/20 to-transparent" />

    <div
      class="romara-container relative flex flex-col justify-end"
      :class="[sizeClasses[size], align === 'center' ? 'items-center text-center' : 'items-start']"
    >
      <!-- Breadcrumbs -->
      <nav
        v-if="breadcrumbs?.length"
        class="mb-5 flex flex-wrap items-center gap-2 text-xs font-medium text-white/60"
        aria-label="Breadcrumb"
      >
        <template v-for="(crumb, index) in breadcrumbs" :key="crumb.label">
          <a v-if="crumb.href" :href="crumb.href" class="transition-colors hover:text-romara-amber">{{ crumb.label }}</a>
          <span v-else class="text-white/85">{{ crumb.label }}</span>
          <span v-if="index < breadcrumbs.length - 1" class="text-white/30">/</span>
        </template>
      </nav>

      <p v-if="eyebrow" class="eyebrow text-romara-amber-300" :class="align === 'center' ? 'justify-center' : ''">
        
        {{ eyebrow }}
      </p>

      <h1 class="mt-4 max-w-3xl font-heading text-display font-semibold text-balance">
        {{ title }}
      </h1>

      <p
        v-if="subtitle"
        class="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg"
      >
        {{ subtitle }}
      </p>

      <!-- Optional actions / widgets (search, filters, buttons) -->
      <div v-if="$slots.default" class="mt-8 w-full">
        <slot />
      </div>
    </div>
  </section>
</template>
