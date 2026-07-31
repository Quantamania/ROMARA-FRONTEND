<script setup lang="ts">
import IconMapPin from '@/components/icons/IconMapPin.vue'
import IconPhone from '@/components/icons/IconPhone.vue'
import IconMail from '@/components/icons/IconMail.vue'
import IconClock from '@/components/icons/IconClock.vue'
import IconCompass from '@/components/icons/IconCompass.vue'
import { romaraOffice } from '@/features/contact/api/contact.api'
</script>

<template>
  <div class="rounded-card bg-white p-6 shadow-card sm:p-7">
    <p class="eyebrow mb-3">
      
      Visit Us
    </p>
    <h2 class="font-heading text-xl font-semibold text-romara-green sm:text-2xl">Our Office</h2>
    <span class="accent-rule mt-4" />

    <ul class="mt-6 space-y-4 text-sm">
      <li class="flex items-start gap-3.5">
        <span class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-romara-amber-100 text-romara-amber">
          <IconMapPin class="h-4 w-4" />
        </span>
        <div>
          <p class="font-semibold text-romara-green">{{ romaraOffice.name }}</p>
          <a
            :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(romaraOffice.addressLines.join(', '))}`"
            target="_blank"
            rel="noopener"
            class="text-romara-ink-soft transition-colors hover:text-romara-amber"
          >
            <span v-for="line in romaraOffice.addressLines" :key="line" class="block">{{ line }}</span>
          </a>
        </div>
      </li>

      <li class="flex items-center gap-3.5">
        <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-romara-amber-100 text-romara-amber">
          <IconPhone class="h-4 w-4" />
        </span>
        <a :href="`tel:${romaraOffice.phone.replace(/\s/g, '')}`" class="text-romara-ink-soft transition-colors hover:text-romara-amber">
          {{ romaraOffice.phone }}
        </a>
      </li>

      <li class="flex items-center gap-3.5">
        <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-romara-amber-100 text-romara-amber">
          <IconMail class="h-4 w-4" />
        </span>
        <a :href="`mailto:${romaraOffice.email}`" class="text-romara-ink-soft transition-colors hover:text-romara-amber">
          {{ romaraOffice.email }}
        </a>
      </li>

      <li class="flex items-center gap-3.5">
        <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-romara-amber-100 text-romara-amber">
          <IconClock class="h-4 w-4" />
        </span>
        <span class="text-romara-ink-soft">{{ romaraOffice.hours }}</span>
      </li>

      <li class="flex items-center gap-3.5">
        <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-romara-amber-100 text-romara-amber">
          <IconCompass class="h-4 w-4" />
        </span>
        <a href="/" class="text-romara-ink-soft transition-colors hover:text-romara-amber">{{ romaraOffice.website }}</a>
      </li>
    </ul>

    <div class="mt-6 overflow-hidden rounded-card border border-romara-green/10 shadow-soft">
      <iframe
        :src="romaraOffice.mapEmbedSrc"
        title="ROMARA Tours & Travel office location"
        class="h-72 w-full border-0"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      />
    </div>
  </div>
</template>
