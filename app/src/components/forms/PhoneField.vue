<template>
  <label>
    <span>{{ label }}</span>
    <input type="tel" placeholder="+254 700 123 456" />
  </label>
</template>
<script setup lang="ts">
const props = defineProps({ label: String })
</script>
