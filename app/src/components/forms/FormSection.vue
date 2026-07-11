<template>
  <section class="form-section">
    <h3>{{ title }}</h3>
    <slot />
  </section>
</template>
<script setup lang="ts">
const props = defineProps({ title: String })
</script>
