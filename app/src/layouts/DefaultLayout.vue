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
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="$route.fullPath" />
        </transition>
      </router-view>
    </main>

    <Footer />
    <WhatsAppFloatButton />
  </div>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.45s ease, transform 0.45s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateX(40px);
}
.page-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.page-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.page-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}
</style>