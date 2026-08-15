<script setup lang="ts">
import IconUserCheck from '@/components/icons/IconUserCheck.vue'
import IconHandshake from '@/components/icons/IconHandshake.vue'
import IconClock from '@/components/icons/IconClock.vue'
import IconUsers from '@/components/icons/IconUsers.vue'
import IconPhone from '@/components/icons/IconPhone.vue'
import IconMail from '@/components/icons/IconMail.vue'
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconCompass from '@/components/icons/IconCompass.vue'
import IconFacebook from '@/components/icons/IconFacebook.vue'
import IconInstagram from '@/components/icons/IconInstagram.vue'
import IconTripadvisor from '@/components/icons/IconTripadvisor.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
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

interface WhyContactItem {
  icon: typeof IconUserCheck
  title: string
  description: string
}

const whyContactItems: WhyContactItem[] = [
  { icon: IconUserCheck, title: 'Expert Advice', description: 'Get professional guidance from our travel experts.' },
  { icon: IconHandshake, title: 'Tailor-Made Tours', description: 'We create personalized itineraries just for you.' },
  { icon: IconClock, title: 'Quick Response', description: 'We respond to all enquiries within 24 hours.' },
  { icon: IconUsers, title: 'Customer Support', description: "We're with you before, during and after your trip." },
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

    <div class="romara-container relative py-14 sm:py-16">
      <!-- Breadcrumbs -->
      <nav
        class="mb-5 flex flex-wrap items-center gap-2 text-xs font-medium text-white/60"
        aria-label="Breadcrumb"
      >
        <a href="/" class="transition-colors hover:text-romara-amber">Home</a>
        <span class="text-white/30">/</span>
        <span class="text-white/85">Contact</span>
      </nav>

      <h1 class="max-w-2xl font-heading text-display-sm font-semibold text-balance sm:text-display">
        We'd Love to Hear From You
      </h1>
     
    </div>
  </section>

  <!-- Fused split card: green info panel welded to the white form -->
  <section class="section-y bg-romara-bone">
    <div class="romara-container">
      <div class="grid overflow-hidden rounded-card shadow-elevated lg:grid-cols-[0.92fr_1.08fr]">
        <!-- Left: green editorial panel -->
        <div class="relative overflow-hidden bg-green-fade p-7 text-white sm:p-10 lg:p-12">
          <div class="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-romara-amber/20 blur-3xl"></div>
          <IconCompass class="pointer-events-none absolute -bottom-8 -right-8 h-56 w-56 text-white/[0.05]" />

          <div class="relative">
            <p class="eyebrow text-romara-amber-300">Get in Touch</p>
           

            <!-- Quick actions -->
            <div class="mt-8 space-y-3">
              <a
                v-for="action in contactActions"
                :key="action.label"
                :href="action.href"
                :target="action.external ? '_blank' : undefined"
                :rel="action.external ? 'noopener' : undefined"
                class="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-romara-amber/40 hover:bg-white/10"
              >
                <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-romara-amber text-white">
                  <component :is="action.icon" class="h-5 w-5" />
                </span>
                <span class="min-w-0 flex-1">
                  <span class="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/55">{{ action.label }}</span>
                  <span class="mt-0.5 block truncate font-heading text-base font-semibold text-white">{{ action.value }}</span>
                </span>
                <IconArrowRight class="h-4 w-4 shrink-0 text-romara-amber-300 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
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
                  class="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-romara-amber hover:text-romara-amber"
                >
                  <component :is="social.icon" class="h-4 w-4" />
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

  <!-- Why Contact ROMARA -->
  <section class="section-y bg-romara-sand">
    <div class="romara-container">
      <SectionHeading
        align="center"
        eyebrow="Why ROMARA"
        title="Travel Planning, Beautifully Handled"
        description="We are here to help"
      />

      <div class="mt-4 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        <div
          v-for="item in whyContactItems"
          :key="item.title"
          class="group rounded-card border border-romara-green/10 bg-white p-6 text-center transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-romara-amber/30 hover:shadow-elevated sm:p-8"
        >
          <span
            class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-fade text-white shadow-soft transition-transform duration-500 ease-out-expo group-hover:scale-105"
          >
            <component :is="item.icon" class="h-6 w-6" />
          </span>
          <p class="mt-5 font-heading text-lg font-semibold text-romara-green">{{ item.title }}</p>
          <p class="mt-2 text-xs leading-relaxed text-romara-ink-soft">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
