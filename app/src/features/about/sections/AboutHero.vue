<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
</script>

<template>
  <section class="relative isolate min-h-[600px] overflow-hidden bg-romara-green text-white sm:min-h-[600px]">
    <img
      src="/src/assets/images/about/hero-safari-vehicle.png"
      alt="ROMARA safari vehicle at sunset"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />

    <div class="romara-container relative flex min-h-[420px] items-center sm:min-h-[480px]">
      <div class="max-w-xl py-16">
        <h1 class="font-heading text-4xl font-bold leading-tight sm:text-5xl">About ROMARA</h1>
        <p class="mt-2 text-lg font-semibold text-romara-amber">Reaching Out to Your Next Adventure</p>
        <p class="mt-4 text-base leading-relaxed text-white/85">
          ROMARA Tours &amp; Travel is a Kenyan travel company passionate about creating memorable, safe, and
          seamless travel experiences across Kenya and beyond.
        </p>

        <div class="mt-8">
          <BaseButton as="a" href="/safari-packages" variant="primary" size="lg">
            Explore Our Tours
            <IconArrowRight class="h-4 w-4" />
          </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>