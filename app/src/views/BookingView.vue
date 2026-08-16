<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useBookingStore } from '@/features/booking/store/booking.store'
import { resolveFromQuery } from '@/features/booking/api/selectedPackage.api'
import IconPhone from '@/components/icons/IconPhone.vue'
import IconMail from '@/components/icons/IconMail.vue'
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'
import BookingProgressIndicator from '@/features/booking/components/BookingProgressIndicator.vue'
import BookingForm from '@/features/booking/components/BookingForm.vue'
import PaymentInfo from '@/features/booking/components/PaymentInfo.vue'
import PopularExperiences from '@/features/booking/components/PopularExperiences.vue'

interface HelpOption {
  icon: typeof IconPhone
  label: string
  value: string
  href: string
  external?: boolean
}

const route = useRoute()
const bookingStore = useBookingStore()

// Arriving from a specific safari or day trip (/booking?package=… or ?daytrip=…)
// fills step 1 in, so the visitor is not asked to re-describe what they just
// clicked on. Every prefilled field stays editable.
//
// Watched rather than run once on mount: /booking?package=a -> /booking?package=b
// keeps the same route component alive, so onMounted would not fire again and
// the second choice would be silently ignored.
watch(
  () => route.query,
  async (query) => {
    const chosen = await resolveFromQuery(query as Record<string, unknown>)
    if (chosen) bookingStore.prefillFromPackage(chosen)
  },
  { immediate: true, deep: true },
)

const helpOptions: HelpOption[] = [
  { icon: IconPhone, label: 'Call Us', value: '+254 700 123 456', href: 'tel:+254700123456' },
  { icon: IconMail, label: 'Email Us', value: 'info@romaratours.com', href: 'mailto:info@romaratours.com' },
  { icon: IconWhatsapp, label: 'Chat on WhatsApp', value: '+254 700 123 456', href: 'https://wa.me/254700123456', external: true },
]

</script>

<template>
  <!-- Page header — a branded green band; the trust card below straddles its edge -->
  <section class="relative isolate overflow-hidden bg-green-fade text-white">
    <div class="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-romara-amber/15 blur-3xl" aria-hidden="true" />
    <div class="pointer-events-none absolute -bottom-16 -left-20 h-64 w-64 rounded-full bg-white/[0.05] blur-3xl" aria-hidden="true" />

    <div class="romara-container relative pb-16 pt-12 sm:pb-20 sm:pt-16">
      <nav class="mb-5 flex flex-wrap items-center gap-2 text-xs font-medium text-white/60" aria-label="Breadcrumb">
        <a href="/" class="transition-colors hover:text-romara-amber">Home</a>
        <span class="text-white/30">/</span>
        <span class="text-white/85">Book Now</span>
      </nav>

      <h1 class="max-w-2xl font-heading text-display-sm font-semibold text-balance animate-fade-up sm:text-display">
        Start Your Adventure Today
      </h1>
    </div>
  </section>

  <!-- The bone sheet curves up out of the green header, echoing the home Why Choose card. -->
  <div class="relative z-10 -mt-8 rounded-t-[2rem] bg-romara-bone sm:-mt-12 sm:rounded-t-[2.75rem]">
    <!-- Progress indicator -->
    <section class="romara-container pt-12 sm:pt-16">
      <div class="rounded-card bg-white p-6 shadow-card sm:p-8">
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
                v-for="(option, index) in helpOptions"
                :key="option.label"
                v-scroll-reveal="{ delay: index * 80 }"
                :href="option.href"
                :target="option.external ? '_blank' : undefined"
                :rel="option.external ? 'noopener' : undefined"
                class="group flex items-center gap-4 rounded-card border border-romara-green/10 bg-romara-bone p-4 transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-romara-amber/30 hover:shadow-card"
              >
                <span
                  class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-fade text-white shadow-soft transition-transform duration-300 ease-out-expo group-hover:scale-110 group-hover:-rotate-6"
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
