<script setup lang="ts">
import IconSearch from '@/components/icons/IconSearch.vue'

interface Props {
  modelValue: string
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function handleInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div
    class="glass flex items-center gap-2.5 rounded-full px-5 py-2.5 transition-colors duration-300 focus-within:border-romara-amber/60 focus-within:bg-white/15"
  >
    <IconSearch class="h-4 w-4 shrink-0 text-romara-amber-300" />
    <input
      :value="modelValue"
      type="search"
      placeholder="Search a question — booking, payment, visa, airport…"
      class="w-full border-none bg-transparent text-sm text-white placeholder:text-white/55 focus:outline-none focus:ring-0"
      @input="handleInput"
    />
  </div>
</template>
