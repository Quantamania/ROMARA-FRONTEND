<script setup lang="ts">
import IconMapPin from '@/components/icons/IconMapPin.vue'
import IconPhone from '@/components/icons/IconPhone.vue'
import IconMail from '@/components/icons/IconMail.vue'
import IconClock from '@/components/icons/IconClock.vue'
import IconCompass from '@/components/icons/IconCompass.vue'
import { romaraOffice } from '@/features/contact/api/contact.api'
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-romara-green sm:text-3xl">Our Office</h2>
    <p class="mt-1 text-sm text-romara-ink/60">Visit us at our office or find us on the map.</p>

    <ul class="mt-6 space-y-4">
      <li class="flex items-start gap-3 text-sm">
        <IconMapPin class="mt-0.5 h-5 w-5 shrink-0 text-romara-amber" />
        <div>
          <p class="font-bold text-romara-green">{{ romaraOffice.name }}</p>
          <a
            :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(romaraOffice.addressLines.join(', '))}`"
            target="_blank"
            rel="noopener"
            class="text-romara-ink/70 hover:text-romara-green"
          >
            <span v-for="line in romaraOffice.addressLines" :key="line" class="block">{{ line }}</span>
          </a>
        </div>
      </li>

      <li class="flex items-center gap-3 text-sm">
        <IconPhone class="h-5 w-5 shrink-0 text-romara-amber" />
        <a :href="`tel:${romaraOffice.phone.replace(/\s/g, '')}`" class="text-romara-ink/70 hover:text-romara-green">
          {{ romaraOffice.phone }}
        </a>
      </li>

      <li class="flex items-center gap-3 text-sm">
        <IconMail class="h-5 w-5 shrink-0 text-romara-amber" />
        <a :href="`mailto:${romaraOffice.email}`" class="text-romara-ink/70 hover:text-romara-green">
          {{ romaraOffice.email }}
        </a>
      </li>

      <li class="flex items-center gap-3 text-sm">
        <IconClock class="h-5 w-5 shrink-0 text-romara-amber" />
        <span class="text-romara-ink/70">{{ romaraOffice.hours }}</span>
      </li>

      <li class="flex items-center gap-3 text-sm">
        <IconCompass class="h-5 w-5 shrink-0 text-romara-amber" />
        <a href="/" class="text-romara-ink/70 hover:text-romara-green">{{ romaraOffice.website }}</a>
      </li>
    </ul>

    <div class="mt-6 overflow-hidden rounded-lg shadow-card">
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