<script setup lang="ts">
import IconShield from '@/components/icons/IconShield.vue'
import IconHeadset from '@/components/icons/IconHeadset.vue'
import IconTag from '@/components/icons/IconTag.vue'
import IconClock from '@/components/icons/IconClock.vue'
import IconPhone from '@/components/icons/IconPhone.vue'
import IconMail from '@/components/icons/IconMail.vue'
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'
import PageHero from '@/components/ui/PageHero.vue'
import BookingProgressIndicator from '@/features/booking/components/BookingProgressIndicator.vue'
import BookingForm from '@/features/booking/components/BookingForm.vue'
import PaymentInfo from '@/features/booking/components/PaymentInfo.vue'
import PopularExperiences from '@/features/booking/components/PopularExperiences.vue'

interface TrustIndicator {
  icon: typeof IconShield
  title: string
  description: string
}

interface HelpOption {
  icon: typeof IconPhone
  label: string
  value: string
  href: string
  external?: boolean
}

const trustIndicators: TrustIndicator[] = [
  { icon: IconShield, title: 'Secure Booking', description: 'Your information is safe with us.' },
  { icon: IconHeadset, title: 'Expert Support', description: "We're here to help you every step." },
  { icon: IconTag, title: 'Best Prices', description: 'Competitive rates guaranteed.' },
  { icon: IconClock, title: 'Quick Response', description: 'We respond within 24 hours.' },
]

const helpOptions: HelpOption[] = [
  { icon: IconPhone, label: 'Call Us', value: '+254 700 123 456', href: 'tel:+254700123456' },
  { icon: IconMail, label: 'Email Us', value: 'info@romaratours.com', href: 'mailto:info@romaratours.com' },
  { icon: IconWhatsapp, label: 'Chat on WhatsApp', value: '+254 700 123 456', href: 'https://wa.me/254700123456', external: true },
]
</script>

<template>
  <!-- Hero -->
  <PageHero
    eyebrow="Book Now"
    title="Start Your Adventure Today"
    subtitle="Fill in your details and let us help you plan your perfect safari or holiday in Kenya."
    image="/src/assets/images/booking/hero-safari-vehicle.jpg"
    size="lg"
    :breadcrumbs="[{ label: 'Home', href: '/' }, { label: 'Book Now' }]"
  />

  <div class="bg-romara-bone">
    <!-- Trust indicators, overlapping hero bottom -->
    <div class="romara-container relative z-10 -mt-12 sm:-mt-16">
      <div class="grid grid-cols-2 gap-6 rounded-card bg-white p-6 shadow-elevated sm:grid-cols-4 sm:p-8">
        <div v-for="item in trustIndicators" :key="item.title" class="flex items-start gap-3.5">
          <span
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-fade text-white shadow-soft"
          >
            <component :is="item.icon" class="h-5 w-5" />
          </span>
          <div>
            <p class="font-heading text-sm font-semibold text-romara-green">{{ item.title }}</p>
            <p class="mt-0.5 text-xs leading-relaxed text-romara-ink-soft">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress indicator -->
    <section class="romara-container pt-12 sm:pt-14">
      <div class="rounded-card bg-white p-6 shadow-card sm:p-8">
        <p class="eyebrow mb-5">
          
          Your Booking Journey
        </p>
        <BookingProgressIndicator />
      </div>
    </section>

    <!-- Form + sidebar, two-column -->
    <section class="romara-container py-12 sm:py-14">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px] lg:gap-10">
        <BookingForm />

        <aside class="space-y-8">
          <!-- Need help booking -->
          <div class="rounded-card bg-white p-6 shadow-card sm:p-7">
            <p class="eyebrow mb-3">
              
              Need Help Booking?
            </p>
            <h2 class="font-heading text-xl font-semibold text-romara-green">Talk to a Travel Expert</h2>
            <span class="accent-rule mt-4" />
            <p class="mt-4 text-sm leading-relaxed text-romara-ink-soft">
              Our travel experts are ready to assist you in planning your dream trip.
            </p>

            <div class="mt-6 space-y-3">
              <a
                v-for="option in helpOptions"
                :key="option.label"
                :href="option.href"
                :target="option.external ? '_blank' : undefined"
                :rel="option.external ? 'noopener' : undefined"
                class="group flex items-center gap-4 rounded-card border border-romara-green/10 bg-romara-bone p-4 transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-romara-amber/30 hover:shadow-card"
              >
                <span
                  class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-fade text-white shadow-soft transition-transform duration-300 ease-out-expo group-hover:scale-105"
                >
                  <component :is="option.icon" class="h-5 w-5" />
                </span>
                <div class="min-w-0 flex-1">
                  <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-romara-ink-soft">{{ option.label }}</p>
                  <p class="mt-0.5 truncate font-heading text-sm font-semibold text-romara-green">{{ option.value }}</p>
                </div>
              </a>
            </div>
          </div>

          <PopularExperiences />
        </aside>
      </div>
    </section>

    <!-- Payment info -->
    <section class="romara-container pb-16 sm:pb-20">
      <PaymentInfo />
    </section>
  </div>
</template>
