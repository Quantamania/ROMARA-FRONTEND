<script setup lang="ts">
import TopContactBar from '@/components/layout/TopContactBar.vue'
import NavBar from '@/components/layout/NavBar.vue'
import Footer from '@/components/layout/Footer.vue'
import WhatsAppFloatButton from '@/components/layout/WhatsAppFloatButton.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <TopContactBar />
    <NavBar />

    <main class="flex-1">
      <router-view />
    </main>

    <Footer />
    <WhatsAppFloatButton />
  </div>
</template>