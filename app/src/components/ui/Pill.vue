<script setup lang="ts">
interface Props {
  tone?: 'amber' | 'green' | 'glass' | 'cream'
}
withDefaults(defineProps<Props>(), { tone: 'amber' })

const toneClasses: Record<string, string> = {
  amber: 'bg-romara-amber text-white',
  green: 'bg-romara-green text-white',
  cream: 'bg-romara-cream text-romara-green',
  glass: 'glass text-white',
}
</script>

<template>
  <span
    :class="toneClasses[tone]"
    class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em]"
  >
    <slot />
  </span>
</template>
