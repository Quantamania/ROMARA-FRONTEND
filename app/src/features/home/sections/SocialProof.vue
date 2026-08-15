<script setup lang="ts">
import { companyStats } from '@/data/companyStats'
import { ref, onMounted, type Ref } from 'vue'
import IconStar from '@/components/icons/IconStar.vue'
import IconMapPin from '@/components/icons/IconMapPin.vue'
import IconThumbsUp from '@/components/icons/IconThumbsUp.vue'
import IconCompass from '@/components/icons/IconCompass.vue'

const memberships = [
  { acronym: 'TRA', name: 'Tourism Regulatory Authority' },
  { acronym: 'KATO', name: 'Kenya Association of Tour Operators' },
  { acronym: 'KPSGA', name: 'Kenya Professional Safari Guides Association' },
]

// Stats count up from zero the first time the band scrolls into view.
const sectionRef = ref<HTMLElement | null>(null)
const rating = ref(0)
const clients = ref(0)
const safaris = ref(0)

function countTo(target: Ref<number>, to: number, duration: number, decimals = 0) {
  const start = performance.now()
  function tick(now: number) {
    const p = Math.min(1, (now - start) / duration)
    const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
    target.value = Number((to * eased).toFixed(decimals))
    if (p < 1) requestAnimationFrame(tick)
    else target.value = to
  }
  requestAnimationFrame(tick)
}

function runCounts() {
  countTo(rating, companyStats.rating, 1100, 1)
  countTo(clients, companyStats.happyClients, 1500)
  countTo(safaris, companyStats.safarisCompleted, 1500)
}

function setFinals() {
  rating.value = companyStats.rating
  clients.value = companyStats.happyClients
  safaris.value = companyStats.safarisCompleted
}

onMounted(() => {
  const el = sectionRef.value
  if (!el) return

  // No motion, or no observer support → show the final figures straight away.
  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !('IntersectionObserver' in window)
  ) {
    setFinals()
    return
  }

  // threshold 0 so it fires the moment the band edges into view — the section is
  // taller than a phone screen, so a higher threshold could never be satisfied.
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        runCounts()
        observer.disconnect()
      }
    },
    { threshold: 0, rootMargin: '0px 0px -15% 0px' },
  )
  observer.observe(el)
})
</script>

<template>
  <section ref="sectionRef" class="section-y relative isolate overflow-hidden bg-romara-green text-white">
    <!-- Background image + legibility scrim (image stays subtle so the text reads clearly) -->
    <img
      src="/images/home/hero-elephants.webp"
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      class="absolute inset-0 h-full w-full object-cover opacity-40"
    />
    <div class="absolute inset-0 bg-green-fade/90 mix-blend-multiply" aria-hidden="true" />
    <div class="absolute inset-0 bg-scrim-b" aria-hidden="true" />

    <div class="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-romara-amber/15 blur-3xl" aria-hidden="true" />

    <div class="romara-container relative">
      <div class="mx-auto max-w-2xl text-center">
        <p class="eyebrow justify-center text-romara-amber-300">Trusted &amp; Accredited</p>
        <h2 class="mt-3 font-heading text-display-sm font-semibold text-white">Travellers love ROMARA</h2>
      </div>

      <!-- Social proof stats -->
      <dl class="mt-12 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
        <div class="text-center">
          <div class="flex justify-center gap-1 text-romara-amber">
            <IconStar v-for="n in 5" :key="n" class="h-5 w-5" />
          </div>
          <dd class="mt-3 font-heading text-3xl font-semibold text-white sm:text-4xl">{{ rating.toFixed(1) }}</dd>
          <dt class="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">Rated by travellers</dt>
        </div>

        <div class="text-center">
          <IconThumbsUp class="mx-auto h-7 w-7 text-romara-amber-300" />
          <dd class="mt-3 font-heading text-3xl font-semibold text-white sm:text-4xl">{{ clients }}+</dd>
          <dt class="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">Happy clients</dt>
        </div>

        <div class="text-center">
          <IconCompass class="mx-auto h-7 w-7 text-romara-amber-300" />
          <dd class="mt-3 font-heading text-3xl font-semibold text-white sm:text-4xl">{{ safaris }}+</dd>
          <dt class="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">Successful safaris</dt>
        </div>

        <div class="text-center">
          <IconMapPin class="mx-auto h-7 w-7 text-romara-amber-300" />
          <dd class="mt-3 font-heading text-2xl font-semibold text-white sm:text-3xl">Kenya-wide</dd>
          <dt class="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">Operating across Kenya</dt>
        </div>
      </dl>

      <!-- Accreditation / memberships -->
      <div class="mt-14 border-t border-white/10 pt-8">
        <p class="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-white/45">Proud members of</p>
        <div class="mt-5 flex flex-wrap items-stretch justify-center gap-3 sm:gap-4">
          <div
            v-for="body in memberships"
            :key="body.acronym"
            class="flex w-full items-center gap-3.5 rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 backdrop-blur-sm sm:w-auto sm:min-w-[150px] sm:max-w-[260px] sm:flex-1"
          >
            <span class="flex h-11 shrink-0 items-center rounded-lg bg-romara-amber px-3 font-heading text-sm font-bold tracking-wide text-white">
              {{ body.acronym }}
            </span>
            <span class="text-xs font-medium leading-snug text-white/80">{{ body.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
