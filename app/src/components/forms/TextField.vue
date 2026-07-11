<template>
  <label>
    <span>{{ label }}</span>
    <input type="text" :placeholder="placeholder" />
  </label>
</template>
<script setup lang="ts">
const props = defineProps({ label: String, placeholder: String })
</script>
