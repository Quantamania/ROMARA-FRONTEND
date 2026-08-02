<script setup lang="ts">
</script>

<template>
  <section class="section-y bg-romara-bone">
    <div class="romara-container">
      <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <!-- Editorial image with framed accent -->
        <div class="relative">
          <div class="pointer-events-none absolute -left-4 -top-4 hidden h-24 w-24 rounded-tl-card border-l-2 border-t-2 border-romara-amber/50 sm:block" aria-hidden="true" />
          <img
            src="/images/about/team-photo.png"
            alt="The ROMARA Tours & Travel team"
            loading="lazy"
            class="w-full rounded-card object-cover shadow-elevated"
          />
        </div>

        <div>
          <p class="eyebrow mb-3">
            
            Our Story
          </p>
          <h2 class="font-heading text-display-sm font-semibold text-romara-green">
            Built on care, planned with purpose
          </h2>
          <span class="accent-rule mt-4" />

          <div class="mt-6 space-y-5 text-base leading-relaxed text-romara-ink-soft">
            <p>
              ROMARA Tours &amp; Travel was founded with a simple mission: to connect people with the beauty of
              Kenya through professional service, careful planning, and personal attention.
            </p>
            <p>
              As a growing company, we continually invest in quality vehicles, reliable transport, exciting tour
              packages, and exceptional customer service.
            </p>
            <p class="text-romara-ink">Every journey is planned with care to ensure comfort, safety, and lasting memories.</p>
          </div>

          <slot name="mission" />
        </div>
      </div>
    </div>
  </section>
</template>
