<script setup lang="ts">
import IconArrowRight from '@/components/icons/IconArrowRight.vue'

interface Props {
  title: string
  linkText?: string
  linkHref?: string
}

defineProps<Props>()
</script>

<template>
  <div class="mb-8 flex items-end justify-between gap-4">
    <div>
      <h2 class="text-2xl font-bold text-romara-green sm:text-3xl">{{ title }}</h2>
      <span class="mt-2 block h-1 w-14 rounded bg-romara-amber" />
    </div>

    
    <a
      v-if="linkText"
      :href="linkHref ?? '#'"
      class="hidden shrink-0 items-center gap-1 text-sm font-semibold text-romara-green hover:text-romara-amber sm:flex"
    >
      {{ linkText }}
      <IconArrowRight class="h-4 w-4" />
    </a>
  </div>
</template>