<script setup lang="ts">
import AboutHero from '@/features/about/sections/AboutHero.vue'
import OurStory from '@/features/about/sections/OurStory.vue'
import MissionValues from '@/features/about/sections/MissionValues.vue'
import WhoWeAre from '@/features/about/sections/WhoWeAre.vue'
import StatsBanner from '@/features/about/sections/StatsBanner.vue'
import CallToAction from '@/features/about/sections/CallToAction.vue'
</script>

<template>
  <AboutHero />

  <OurStory>
    <template #mission>
      <MissionValues />
    </template>
  </OurStory>

  <WhoWeAre />
  <StatsBanner />
  <CallToAction />
</template>