
CallToAction.vue (new file)
vue<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import IconSuitcase from '@/components/icons/IconSuitcase.vue'
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'
</script>

<template>
  <section class="romara-container pb-16">
    <div class="flex flex-col items-center gap-6 rounded-lg bg-romara-cream p-6 sm:flex-row sm:justify-between sm:p-8">
      <div class="flex items-center gap-4 text-center sm:text-left">
        <span class="hidden h-14 w-14 shrink-0 items-center justify-center rounded-md bg-white text-romara-green shadow-card sm:flex">
          <IconSuitcase class="h-7 w-7" />
        </span>
        <div>
          <p class="text-lg font-bold text-romara-green">Ready to Start Your Adventure?</p>
          <p class="mt-1 text-sm text-romara-ink/60">Let ROMARA plan the perfect trip for you.</p>
        </div>
      </div>

      <div class="flex flex-wrap justify-center gap-3">
        <BaseButton as="a" href="/book-now" variant="primary">Book Your Safari</BaseButton>
        <BaseButton as="a" href="/contact" variant="outline">Request a Quote</BaseButton>
        <BaseButton as="a" href="https://wa.me/254700123456" variant="amber">
          <IconWhatsapp class="h-4 w-4" />
          Chat on WhatsApp
        </BaseButton>
      </div>
    </div>
  </section>
</template>