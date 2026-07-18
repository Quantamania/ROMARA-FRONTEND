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
  <div class="flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-5 py-4 backdrop-blur-md">
    <IconSearch class="h-5 w-5 shrink-0 text-white/70" />
    <input
      :value="modelValue"
      type="search"
      placeholder="Search a question — booking, payment, visa, airport..."
      class="w-full border-none bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-0"
      @input="handleInput"
    />
  </div>
</template>