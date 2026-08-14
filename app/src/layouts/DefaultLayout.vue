<script setup lang="ts">
import NavBar from '@/components/layout/NavBar.vue'
import Footer from '@/components/layout/Footer.vue'
import WhatsAppFloatButton from '@/components/layout/WhatsAppFloatButton.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <NavBar />
    <!-- Spacer matches the fixed header height at each breakpoint so content
         starts right below the navbar with no white gap. -->
    <div class="h-[93px] sm:h-[97px] xl:h-[121px]" />

    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <!-- The wrapper is load-bearing, not cosmetic.
               Most views have multi-root templates, and <Transition mode="out-in">
               can only animate a single element root. Given a fragment it warned
               "renders non-element root node that cannot be animated", the leave
               callback never fired, and the incoming page was never inserted — so
               every in-app navigation left <main> empty and the site only worked
               on a hard refresh. Wrapping gives the transition one real element. -->
          <div :key="$route.fullPath">
            <component :is="Component" />
          </div>
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