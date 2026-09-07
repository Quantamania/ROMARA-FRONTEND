<script setup lang="ts">
import IconClock from '@/components/icons/IconClock.vue'
import IconPhone from '@/components/icons/IconPhone.vue'
import IconMail from '@/components/icons/IconMail.vue'
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconCompass from '@/components/icons/IconCompass.vue'
import IconFacebook from '@/components/icons/IconFacebook.vue'
import IconInstagram from '@/components/icons/IconInstagram.vue'
import IconTripadvisor from '@/components/icons/IconTripadvisor.vue'
import IconHeadset from '@/components/icons/IconHeadset.vue'
import IconMapPin from '@/components/icons/IconMapPin.vue'
import ContactForm from '@/features/contact/components/ContactForm.vue'
import OfficeMap from '@/features/contact/components/OfficeMap.vue'

interface ContactAction {
  icon: typeof IconPhone
  label: string
  value: string
  href: string
  external?: boolean
}

const contactActions: ContactAction[] = [
  { icon: IconPhone, label: 'Call Us', value: '+254 700 123 456', href: 'tel:+254700123456' },
  { icon: IconMail, label: 'Email Us', value: 'info@romaratours.com', href: 'mailto:info@romaratours.com' },
  { icon: IconWhatsapp, label: 'WhatsApp', value: 'Chat with an expert', href: 'https://wa.me/254700123456', external: true },
]

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com', icon: IconFacebook },
  { name: 'Instagram', href: 'https://instagram.com', icon: IconInstagram },
  { name: 'TripAdvisor', href: 'https://tripadvisor.com', icon: IconTripadvisor },
  { name: 'WhatsApp', href: 'https://wa.me/254700123456', icon: IconWhatsapp },
]


</script>

<template>
  <!-- Hero — minimal availability band (lean, so the fused card below leads) -->
  <section class="relative isolate overflow-hidden bg-romara-green text-white">
    <img
      src="/images/contact/hero.webp"
      alt=""
      aria-hidden="true"
      class="absolute inset-0 h-full w-full object-cover opacity-20"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-romara-green-dark/85 via-romara-green/55 to-romara-green/40"></div>

    <div class="romara-container relative pb-20 pt-14 sm:pb-28 sm:pt-16">
      <!-- Breadcrumbs -->
      <nav
        class="mb-5 flex flex-wrap items-center gap-2 text-xs font-medium text-white/60"
        aria-label="Breadcrumb"
      >
        <a href="/" class="transition-colors hover:text-romara-amber">Home</a>
        <span class="text-white/30">/</span>
        <span class="text-white/85">Contact</span>
      </nav>

      <h1 class="max-w-2xl font-heading text-display-sm font-semibold text-balance animate-fade-up sm:text-display">
        We'd Love to Hear From You
      </h1>

      <!-- Functional at-a-glance facts — sets expectations without a marketing sentence -->
      <div class="mt-6 flex flex-wrap gap-2.5 animate-fade-up" style="animation-delay: 120ms">
        <span class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/85 backdrop-blur-sm">
          <IconHeadset class="h-3.5 w-3.5 text-romara-amber-300" />
          Replies within 24 hrs
        </span>
        <span class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/85 backdrop-blur-sm">
          <IconClock class="h-3.5 w-3.5 text-romara-amber-300" />
          Mon–Sat · 8am–6pm EAT
        </span>
        <span class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/85 backdrop-blur-sm">
          <IconMapPin class="h-3.5 w-3.5 text-romara-amber-300" />
          Ngong Road, Nairobi
        </span>
      </div>
    </div>
  </section>

  <!-- Fused split card: green info panel welded to the white form.
       The bone sheet curves up out of the hero, echoing the home Why Choose card. -->
  <section class="section-y relative z-10 -mt-8 rounded-t-[2rem] bg-romara-bone sm:-mt-12 sm:rounded-t-[2.75rem]">
    <div class="romara-container">
      <div class="grid overflow-hidden rounded-2xl shadow-elevated lg:grid-cols-[0.92fr_1.08fr]">
        <!-- Left: green editorial panel -->
        <div class="relative flex flex-col justify-center overflow-hidden bg-romara-green-dark p-7 text-white sm:p-10 lg:p-12">
          <!-- One warm hairline along the top edge — the only flourish, in place of the old glow. -->
          <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-romara-amber/40 to-transparent" aria-hidden="true"></div>
          <IconCompass class="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 text-white/[0.04]" aria-hidden="true" />

          <div class="relative">
            <p class="eyebrow text-romara-amber-300">Get in Touch</p>
            <h2 class="mt-3 font-heading text-2xl font-semibold leading-tight text-white sm:text-3xl">
              Let's plan your journey
            </h2>
            <p class="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
              Reach us however's easiest — we'd love to help shape your Kenyan adventure.
            </p>
           

            <!-- Quick actions — clean rows separated by hairlines rather than chunky cards -->
            <div class="mt-8 divide-y divide-white/10 border-y border-white/10">
              <a
                v-for="(action, index) in contactActions"
                :key="action.label"
                v-scroll-reveal="{ delay: index * 90 }"
                :href="action.href"
                :target="action.external ? '_blank' : undefined"
                :rel="action.external ? 'noopener' : undefined"
                class="group flex items-center gap-4 py-4 transition-colors duration-300"
              >
                <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-romara-amber-300 ring-1 ring-white/10 transition-colors duration-300 ease-out-expo group-hover:bg-romara-amber group-hover:text-white group-hover:ring-transparent">
                  <component :is="action.icon" class="h-[18px] w-[18px]" />
                </span>
                <span class="min-w-0 flex-1">
                  <span class="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/55">{{ action.label }}</span>
                  <span class="mt-0.5 block truncate font-heading text-base font-semibold text-white">{{ action.value }}</span>
                </span>
                <IconArrowRight class="h-4 w-4 shrink-0 text-white/30 transition-all duration-300 ease-out-expo group-hover:translate-x-1 group-hover:text-romara-amber-300" />
              </a>
            </div>

            <!-- Socials -->
            <div class="mt-9">
              <p class="text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">Follow the journey</p>
              <div class="mt-3 flex items-center gap-3">
                <a
                  v-for="social in socialLinks"
                  :key="social.name"
                  :href="social.href"
                  target="_blank"
                  rel="noopener"
                  :aria-label="social.name"
                  class="inline-flex text-white/80 transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:text-romara-amber-300"
                >
                  <component :is="social.icon" class="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: white form -->
        <div class="bg-white p-7 sm:p-10 lg:p-12">
          <p class="eyebrow">Send a Message</p>
         

          <div class="mt-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Location / office + map -->
  <section class="bg-white pb-16 sm:pb-20">
    <div class="romara-container">
      <OfficeMap />
    </div>
  </section>
</template>
