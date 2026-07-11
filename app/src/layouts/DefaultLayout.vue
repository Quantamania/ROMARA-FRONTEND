<template>
  <div class="min-h-screen flex flex-col">
    <TopContactBar />
    <NavBar />
    <MobileMenu />
    <main class="flex-1">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <router-view />
      </div>
    </main>
    <Footer />
    <WhatsAppFloatButton />
  </div>
</template>

<script setup lang="ts">
import TopContactBar from '../components/layout/TopContactBar.vue'
import NavBar from '../components/layout/NavBar.vue'
import MobileMenu from '../components/layout/MobileMenu.vue'
import Footer from '../components/layout/Footer.vue'
import WhatsAppFloatButton from '../components/layout/WhatsAppFloatButton.vue'
</script>
