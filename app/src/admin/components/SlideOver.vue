<script setup lang="ts">
defineProps<{ open: boolean; title: string }>()
defineEmits<{ close: [] }>()
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="fixed inset-0 z-40 bg-romara-green-dark/40" @click="$emit('close')" />
    </Transition>
    <Transition name="slide">
      <aside
        v-if="open"
        class="fixed z-50 bg-romara-cream shadow-xl overflow-y-auto
               inset-x-0 bottom-0 rounded-t-2xl max-h-[85vh]
               sm:inset-y-0 sm:right-0 sm:left-auto sm:w-[420px] sm:rounded-none sm:max-h-none"
      >
        <div class="flex items-center justify-between px-6 py-4 border-b border-romara-ink/10 sticky top-0 bg-romara-cream">
          <h2 class="font-heading text-xl text-romara-ink">{{ title }}</h2>
          <button
            aria-label="Close panel"
            class="text-romara-ink/60 hover:text-romara-ink text-xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-romara-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-romara-amber"
            @click="$emit('close')"
          >
            &times;
          </button>
        </div>
        <div class="p-6">
          <slot />
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-enter-active, .slide-leave-active { transition: transform 0.25s ease; }
.slide-enter-from, .slide-leave-to { transform: translateY(100%); }
@media (min-width: 640px) {
  .slide-enter-from, .slide-leave-to { transform: translateX(100%); }
}
</style>
