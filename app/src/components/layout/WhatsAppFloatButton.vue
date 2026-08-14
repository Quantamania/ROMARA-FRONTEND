<script setup lang="ts">
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'

// Not shown in the homepage mockup itself, but required site-wide per the
// contract doc (§2.6: "floating WhatsApp button... accessible on all pages").
const whatsappNumber = '254700123456'
</script>

<template>
  <a
    :href="`https://wa.me/${whatsappNumber}`"
    target="_blank"
    rel="noopener"
    aria-label="Chat on WhatsApp"
    class="fixed bottom-[4.75rem] right-4 z-50 lg:bottom-6 lg:right-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
  >
    <IconWhatsapp class="h-7 w-7" />
  </a>
</template>