<script setup lang="ts">
import IconShield from '@/components/icons/IconShield.vue'
import IconHeadset from '@/components/icons/IconHeadset.vue'
import IconTag from '@/components/icons/IconTag.vue'
import IconClock from '@/components/icons/IconClock.vue'
import IconPhone from '@/components/icons/IconPhone.vue'
import IconMail from '@/components/icons/IconMail.vue'
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
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

const bookingSteps = ['Details', 'Trip', 'Confirm']
</script>

<template>
  <!-- Hero — focused task band (operate mode: solid green field + step cue) -->
  <section class="relative isolate overflow-hidden bg-romara-green text-white">
    <div class="absolute inset-0 bg-green-fade"></div>
    <div class="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-romara-amber/15 blur-3xl"></div>
    <div class="absolute inset-0 bg-scrim-b"></div>

    <div class="romara-container relative pt-14 pb-24 sm:pt-16 sm:pb-28">
      <!-- Breadcrumbs -->
      <nav
        class="mb-5 flex flex-wrap items-center gap-2 text-xs font-medium text-white/60"
        aria-label="Breadcrumb"
      >
        <a href="/" class="transition-colors hover:text-romara-amber">Home</a>
        <span class="text-white/30">/</span>
        <span class="text-white/85">Book Now</span>
      </nav>

      <h1 class="max-w-2xl font-heading text-display-sm font-semibold text-balance sm:text-display">
        Start Your Adventure Today
      </h1>
      <p class="mt-4 max-w-xl text-base leading-relaxed text-white/80">
        Fill in your details and let us help you plan your perfect safari or holiday in Kenya.
      </p>

      <!-- 3 simple steps micro-cue previewing the flow -->
      <div class="mt-7 animate-fade-up">
        <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">3 simple steps</p>
        <ol class="mt-3 flex flex-wrap items-center gap-x-2 gap-y-3">
          <li v-for="(step, i) in bookingSteps" :key="step" class="flex items-center gap-2">
            <span class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 py-1.5 pl-1.5 pr-3.5 backdrop-blur-sm">
              <span class="flex h-6 w-6 items-center justify-center rounded-full bg-romara-amber text-[11px] font-bold text-white">{{ i + 1 }}</span>
              <span class="text-xs font-semibold text-white/90">{{ step }}</span>
            </span>
            <IconArrowRight v-if="i < bookingSteps.length - 1" class="h-3.5 w-3.5 shrink-0 text-white/35" />
          </li>
        </ol>
      </div>
    </div>
  </section>

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
