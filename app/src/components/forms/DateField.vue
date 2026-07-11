<template>
  <label>
    <span>{{ label }}</span>
    <input type="date" />
  </label>
</template>
<script setup lang="ts">
const props = defineProps({ label: String })
</script>
