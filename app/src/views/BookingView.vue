<script setup lang="ts">
import IconShield from '@/components/icons/IconShield.vue'
import IconHeadset from '@/components/icons/IconHeadset.vue'
import IconTag from '@/components/icons/IconTag.vue'
import IconClock from '@/components/icons/IconClock.vue'
import IconPhone from '@/components/icons/IconPhone.vue'
import IconMail from '@/components/icons/IconMail.vue'
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'
import BookingProgressIndicator from '@/features/booking/components/BookingProgressIndicator.vue'
import BookingForm from '@/features/booking/components/BookingForm.vue'
import PaymentInfo from '@/features/booking/components/PaymentInfo.vue'
import PopularExperiences from '@/features/booking/components/PopularExperiences.vue'

interface TrustIndicator {
  icon: typeof IconShield
  title: string
  description: string
}

const trustIndicators: TrustIndicator[] = [
  { icon: IconShield, title: 'Secure Booking', description: 'Your information is safe with us.' },
  { icon: IconHeadset, title: 'Expert Support', description: "We're here to help you every step." },
  { icon: IconTag, title: 'Best Prices', description: 'Competitive rates guaranteed.' },
  { icon: IconClock, title: 'Quick Response', description: 'We respond within 24 hours.' },
]
</script>

<template>
  <!-- Hero -->
  <section class="isolate relative bg-romara-green min-h-[440px] sm:min-h-[480px] overflow-hidden text-white">
    <img
      src="/src/assets/images/booking/hero-safari-vehicle.jpg"
      alt="Safari vehicle with elephants at sunset"
      class="absolute inset-0 w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />

    <div class="relative flex items-center py-16 min-h-[440px] sm:min-h-[480px] romara-container">
      <div class="max-w-xl">
        <p class="font-bold text-romara-amber text-sm uppercase tracking-[0.2em]">Book Now</p>
        <h1 class="mt-3 font-heading font-bold text-4xl sm:text-5xl leading-tight">Start Your Adventure Today</h1>
        <span class="block bg-romara-amber mt-3 rounded w-14 h-1" />
        <p class="mt-4 text-white/85 text-base leading-relaxed">
          Fill in your details and let us help you plan your perfect safari or holiday in Kenya.
        </p>
      </div>
    </div>
  </section>

  <!-- Trust indicators, overlapping hero bottom -->
  <section class="z-10 relative -mt-10 sm:-mt-12 romara-container">
    <div class="gap-6 grid grid-cols-2 sm:grid-cols-4 bg-white shadow-overlap p-6 rounded-lg">
      <div v-for="item in trustIndicators" :key="item.title" class="flex items-start gap-3">
        <component :is="item.icon" class="w-7 h-7 text-romara-amber shrink-0" />
        <div>
          <p class="font-bold text-romara-green text-sm">{{ item.title }}</p>
          <p class="mt-0.5 text-romara-ink/60 text-xs leading-relaxed">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Progress indicator -->
  <section class="py-10 romara-container">
    <div class="bg-white shadow-card p-6 sm:p-8 rounded-lg">
      <BookingProgressIndicator />
    </div>
  </section>

  <!-- Form + sidebar, two-column -->
  <section class="pb-16 romara-container">
    <div class="gap-8 grid grid-cols-1 lg:grid-cols-[1fr_340px]">
      <BookingForm />

      <aside class="space-y-6">
        <div class="bg-romara-cream p-6 rounded-lg">
          <p class="font-bold text-romara-green text-lg">Need Help Booking?</p>
          <p class="mt-2 text-romara-ink/60 text-sm">
            Our travel experts are ready to assist you in planning your dream trip.
          </p>

          <div class="space-y-4 mt-5">
            <a href="tel:+254700123456" class="flex items-center gap-3">
              <IconPhone class="w-5 h-5 text-romara-amber shrink-0" />
              <div>
                <p class="text-romara-ink/50 text-xs">Call Us</p>
                <p class="font-semibold text-romara-green text-sm">+254 700 123 456</p>
              </div>
            </a>
            <a href="mailto:info@romaratours.com" class="flex items-center gap-3">
              <IconMail class="w-5 h-5 text-romara-amber shrink-0" />
              <div>
                <p class="text-romara-ink/50 text-xs">Email Us</p>
                <p class="font-semibold text-romara-green text-sm">info@romaratours.com</p>
              </div>
            </a>
            <a href="https://wa.me/254700123456" target="_blank" rel="noopener" class="flex items-center gap-3">
              <IconWhatsapp class="w-5 h-5 text-romara-amber shrink-0" />
              <div>
                <p class="text-romara-ink/50 text-xs">Chat on WhatsApp</p>
                <p class="font-semibold text-romara-green text-sm">+254 700 123 456</p>
              </div>
            </a>
          </div>
        </div>

        <PopularExperiences />
      </aside>
    </div>
  </section>

  <!-- Payment info -->
  <section class="pb-16 romara-container">
    <PaymentInfo />
  </section>
</template>