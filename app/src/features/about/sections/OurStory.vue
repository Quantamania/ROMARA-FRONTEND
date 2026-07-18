<script setup lang="ts">
</script>

<template>
  <section class="romara-container py-16">
    <div class="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
      <img
        src="/src/assets/images/about/team-photo.png"
        alt="The ROMARA Tours & Travel team"
        class="w-full rounded-lg object-cover"
      />

      <div>
        <h2 class="text-2xl font-bold text-romara-green sm:text-3xl">Our Story</h2>

        <div class="mt-4 space-y-4 text-sm leading-relaxed text-romara-ink/75">
          <p>
            ROMARA Tours &amp; Travel was founded with a simple mission: to connect people with the beauty of
            Kenya through professional service, careful planning, and personal attention.
          </p>
          <p>
            As a growing company, we continually invest in quality vehicles, reliable transport, exciting tour
            packages, and exceptional customer service.
          </p>
          <p>Every journey is planned with care to ensure comfort, safety, and lasting memories.</p>
        </div>

        <slot name="mission" />
      </div>
    </div>
  </section>
</template>