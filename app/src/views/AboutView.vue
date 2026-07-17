<script setup lang="ts">
import AboutHero from '@/features/about/sections/AboutHero.vue'
import OurStory from '@/features/about/sections/OurStory.vue'
import MissionValues from '@/features/about/sections/MissionValues.vue'
import WhoWeAre from '@/features/about/sections/WhoWeAre.vue'
import StatsBanner from '@/features/about/sections/StatsBanner.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'
</script>

<template>
  <!-- Hero with parallax effect -->
  <div v-scroll-reveal>
    <AboutHero />
  </div>

  <!-- Unique diagonal split section -->
  <section class="relative bg-romara-green overflow-hidden">
    <div class="absolute inset-0">
      <img
        src="/src/assets/images/about/cheetah1.jpeg"
        alt="Cheetah"
        class="opacity-30 w-full h-full object-cover"
      />
    </div>
    <div class="relative py-20 romara-container">
      <div class="items-center gap-8 grid grid-cols-1 lg:grid-cols-12">
        <!-- Decorative number -->
        <div class="lg:col-span-2">
          <div class="font-heading font-bold text-white/10 text-9xl">01</div>
        </div>
        
        <!-- Content -->
        <div class="lg:col-span-10">
          <div class="bg-white/10 backdrop-blur-md p-8 sm:p-12 border border-white/20 rounded-3xl">
            <h2 class="font-heading font-bold text-white text-4xl sm:text-5xl">
              Born from
              <span class="text-romara-amber">Passion</span>
            </h2>
            <p class="mt-4 text-white/90 text-lg leading-relaxed">
              ROMARA Tours & Travel was founded with a simple yet powerful vision: to connect people with the untamed beauty of Kenya through experiences that transform, inspire, and create lasting memories.
            </p>
            <div class="flex flex-wrap gap-4 mt-8">
              <div class="flex items-center gap-3 bg-white/20 px-4 py-2 rounded-full">
                <div class="bg-romara-amber rounded-full w-3 h-3"></div>
                <span class="font-medium text-white">Kenyan Owned</span>
              </div>
              <div class="flex items-center gap-3 bg-white/20 px-4 py-2 rounded-full">
                <div class="bg-romara-amber rounded-full w-3 h-3"></div>
                <span class="font-medium text-white">Local Experts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Mission Values embedded -->
  <div v-scroll-reveal>
    <OurStory>
      <template #mission>
        <MissionValues />
      </template>
    </OurStory>
  </div>

  <!-- Who We Are with background image -->
  <section class="relative py-20 overflow-hidden">
    <img
      src="/src/assets/images/gallery/elephant1.jpeg"
      alt="Elephant herd"
      class="absolute inset-0 opacity-15 w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-romara-cream/95" />
    <div class="relative romara-container">
      <div v-scroll-reveal-scale>
        <WhoWeAre />
      </div>
    </div>
  </section>

  <!-- Stats Banner with left animation -->
  <div v-scroll-reveal-left>
    <StatsBanner />
  </div>

  <!-- Creative CTA with card design -->
  <section class="relative bg-romara-cream py-24 overflow-hidden">
    <!-- Abstract decorative elements -->
    <div class="top-0 right-0 absolute bg-romara-green/5 blur-3xl rounded-full w-96 h-96 -translate-y-1/2 translate-x-1/2"></div>
    <div class="bottom-0 left-0 absolute bg-romara-amber/5 blur-3xl rounded-full w-80 h-80 -translate-x-1/2 translate-y-1/2"></div>

    <div class="relative romara-container">
      <div class="items-center gap-8 grid grid-cols-1 lg:grid-cols-12">
        <!-- Left side - decorative -->
        <div class="hidden lg:block lg:col-span-4">
          <div class="relative">
            <div class="-top-8 -left-8 absolute bg-romara-amber/20 blur-2xl rounded-full w-32 h-32"></div>
            <img
              src="/src/assets/images/gallery/lion.jpeg"
              alt="Lion"
              class="relative shadow-2xl rounded-3xl rotate-3"
            />
          </div>
        </div>

        <!-- Right side - content card -->
        <div class="lg:col-span-8">
          <div class="relative bg-white shadow-2xl p-8 sm:p-12 rounded-3xl overflow-hidden">
            <!-- Decorative accent -->
            <div class="top-0 right-0 absolute bg-romara-green/5 rounded-full w-32 h-32 -translate-y-1/2 translate-x-1/2"></div>

            <div class="relative">
              <div class="inline-flex items-center gap-2 bg-romara-green mb-6 px-4 py-2 rounded-full">
                <span class="bg-romara-amber rounded-full w-2 h-2 animate-pulse"></span>
                <span class="font-bold text-white text-xs uppercase tracking-wider">Start Your Adventure</span>
              </div>

              <h2 class="font-heading font-bold text-romara-green text-4xl sm:text-5xl leading-tight">
                Your Kenyan
                <span class="text-romara-amber">Adventure</span>
                <br />
                Awaits
              </h2>

              <p class="mt-4 text-romara-ink/70 text-lg leading-relaxed">
                From the vast savannas of the Maasai Mara to the pristine beaches of the Kenyan coast, let us craft your perfect journey.
              </p>

              <div class="gap-4 grid grid-cols-1 sm:grid-cols-3 mt-8">
                <BaseButton as="a" href="/safari-packages" variant="amber" size="lg" class="col-span-1 sm:col-span-2">
                  Browse Packages
                </BaseButton>
                <BaseButton as="a" href="/contact" variant="outline" class="col-span-1">
                  Get Quote
                </BaseButton>
              </div>

              <div class="flex items-center gap-4 mt-6">
                <div class="flex items-center gap-2">
                  <div class="bg-romara-green rounded-full w-2 h-2"></div>
                  <span class="text-romara-ink/60 text-sm">Expert Guides</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="bg-romara-green rounded-full w-2 h-2"></div>
                  <span class="text-romara-ink/60 text-sm">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>