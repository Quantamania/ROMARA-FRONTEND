<template>
  <label>
    <span>{{ label }}</span>
    <select><slot /></select>
  </label>
</template>
<script setup lang="ts">
const props = defineProps({ label: String })
</script>
