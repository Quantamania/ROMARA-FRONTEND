<script setup lang="ts">
/**
 * Breadcrumb trail. The last item is the current page (not a link); every
 * earlier item links back up the hierarchy via RouterLink, so moving back a
 * level is an instant in-app navigation rather than a full reload.
 *
 * `tone` adapts the colours to the background: `onDark` (default) for the green
 * hero mastheads, `onLight` for light/cream sections.
 */
interface Crumb {
  label: string
  to?: string
}

withDefaults(
  defineProps<{
    items: Crumb[]
    align?: 'left' | 'center'
    tone?: 'onDark' | 'onLight'
  }>(),
  { align: 'left', tone: 'onDark' },
)

const styles = {
  onDark: {
    link: 'text-white/60 hover:text-romara-amber-300',
    sep: 'text-white/30',
    current: 'text-romara-amber-300',
  },
  onLight: {
    link: 'text-romara-ink-soft hover:text-romara-amber',
    sep: 'text-romara-ink/30',
    current: 'text-romara-amber',
  },
} as const
</script>

<template>
  <nav
    aria-label="Breadcrumb"
    class="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em]"
    :class="align === 'center' ? 'justify-center' : ''"
  >
    <template v-for="(crumb, index) in items" :key="index">
      <RouterLink
        v-if="crumb.to && index < items.length - 1"
        :to="crumb.to"
        class="transition-colors duration-300"
        :class="styles[tone].link"
      >{{ crumb.label }}</RouterLink>
      <span
        v-else
        :class="styles[tone].current"
        :aria-current="index === items.length - 1 ? 'page' : undefined"
      >{{ crumb.label }}</span>
      <span v-if="index < items.length - 1" :class="styles[tone].sep" aria-hidden="true">/</span>
    </template>
  </nav>
</template>
