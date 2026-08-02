<script setup lang="ts">
import { ref, reactive, computed, watch, nextTick, onBeforeUnmount } from 'vue'
import IconMapPin from '@/components/icons/IconMapPin.vue'
import IconCalendar from '@/components/icons/IconCalendar.vue'
import IconClock from '@/components/icons/IconClock.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'
import IconPawPrint from '@/components/icons/IconPawPrint.vue'
import IconPalmBeach from '@/components/icons/IconPalmBeach.vue'
import IconMountain from '@/components/icons/IconMountain.vue'
import IconBuilding from '@/components/icons/IconBuilding.vue'
import IconUsers from '@/components/icons/IconUsers.vue'
import IconCompass from '@/components/icons/IconCompass.vue'
import type { Destination, DestinationType } from '@/features/destinations/types/destination.types'

interface Props {
  destination: Destination | null
  open: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{ close: [] }>()

/**
 * Each destination "vibe" tunes the modal: an accent colour, a motif icon,
 * a caption and a silhouette shape at the foot of the image — so a beach reads
 * differently from a savannah or a mountain. Accents are used only as low-alpha
 * glows/hover tints; the brand green/amber structure stays intact.
 */
interface Vibe {
  label: string
  icon: typeof IconPawPrint
  accent: string // "r g b"
  silhouette: 'grass' | 'wave' | 'peaks' | 'skyline'
}

const vibeMap: Record<DestinationType, Vibe> = {
  wildlife: { label: 'Wildlife Safari', icon: IconPawPrint, accent: '200 134 58', silhouette: 'grass' },
  beaches: { label: 'Beach Escape', icon: IconPalmBeach, accent: '45 178 170', silhouette: 'wave' },
  mountains: { label: 'Mountain Trail', icon: IconMountain, accent: '99 138 160', silhouette: 'peaks' },
  cities: { label: 'City Lights', icon: IconBuilding, accent: '150 140 176', silhouette: 'skyline' },
  culture: { label: 'Cultural Journey', icon: IconUsers, accent: '201 112 74', silhouette: 'grass' },
  nature: { label: 'Wild Nature', icon: IconCompass, accent: '53 128 84', silhouette: 'peaks' },
}

const vibe = computed<Vibe>(() => {
  const type = props.destination?.types?.[0]
  return (type && vibeMap[type]) || vibeMap.wildlife
})

// --- Pointer-reactive image (parallax drift + accent glow) ------------------
const pointer = reactive({ mx: 50, my: 50, tx: 0, ty: 0 })
let praf = 0
function onPointerMove(event: PointerEvent) {
  const el = event.currentTarget as HTMLElement
  const r = el.getBoundingClientRect()
  const x = (event.clientX - r.left) / r.width
  const y = (event.clientY - r.top) / r.height
  if (praf) return
  praf = window.requestAnimationFrame(() => {
    pointer.mx = x * 100
    pointer.my = y * 100
    pointer.tx = (x - 0.5) * -18
    pointer.ty = (y - 0.5) * -18
    praf = 0
  })
}
function onPointerLeave() {
  pointer.mx = 50
  pointer.my = 50
  pointer.tx = 0
  pointer.ty = 0
}
const imageStyle = computed(() => ({
  transform: `scale(1.08) translate3d(${pointer.tx}px, ${pointer.ty}px, 0)`,
}))
const glowStyle = computed(() => ({
  background: `radial-gradient(240px circle at ${pointer.mx}% ${pointer.my}%, rgb(${vibe.value.accent} / 0.55), transparent 62%)`,
}))

// --- Accessibility: focus trap, scroll lock, esc ----------------------------
const panelRef = ref<HTMLElement | null>(null)
const closeRef = ref<HTMLElement | null>(null)
let lastFocused: HTMLElement | null = null

function close() {
  emit('close')
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    close()
    return
  }
  if (event.key !== 'Tab' || !panelRef.value) return
  const focusables = panelRef.value.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
  )
  if (!focusables.length) return
  const first = focusables[0]
  const last = focusables[focusables.length - 1]
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(
  () => props.open,
  (isOpen) => {
    if (typeof document === 'undefined') return
    if (isOpen) {
      lastFocused = document.activeElement as HTMLElement
      document.documentElement.style.overflow = 'hidden'
      document.addEventListener('keydown', onKeydown)
      onPointerLeave()
      nextTick(() => closeRef.value?.focus())
    } else {
      document.documentElement.style.overflow = ''
      document.removeEventListener('keydown', onKeydown)
      lastFocused?.focus?.()
    }
  },
)

onBeforeUnmount(() => {
  document.documentElement.style.overflow = ''
  document.removeEventListener('keydown', onKeydown)
  if (praf) window.cancelAnimationFrame(praf)
})
</script>

<template>
  <Teleport to="body">
    <transition name="dm" :duration="{ enter: 460, leave: 440 }">
      <div
        v-if="open && destination"
        class="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
        role="dialog"
        aria-modal="true"
        :aria-label="`${destination.name} details`"
        :style="{ '--accent': vibe.accent }"
      >
        <!-- Blurred backdrop -->
        <div class="absolute inset-0 bg-romara-green-dark/55 backdrop-blur-md" @click="close" />

        <!-- Panel -->
        <div
          ref="panelRef"
          class="dm-panel relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl bg-romara-bone shadow-elevated ring-1 ring-romara-green/10 sm:max-h-[88vh] sm:rounded-3xl md:flex-row"
        >
          <!-- Close -->
          <button
            ref="closeRef"
            type="button"
            aria-label="Close"
            class="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition-colors duration-300 hover:bg-black/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            @click="close"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Left: interactive, vibe-tinted image -->
          <div
            class="group/img relative h-60 shrink-0 overflow-hidden sm:h-72 md:h-auto md:w-[46%]"
            @pointermove="onPointerMove"
            @pointerleave="onPointerLeave"
          >
            <img
              :src="destination.image"
              :alt="destination.name"
              class="dm-img absolute inset-0 h-full w-full object-cover will-change-transform"
              :style="imageStyle"
            />
            <!-- vibe colour wash + pointer glow -->
            <div class="pointer-events-none absolute inset-0 mix-blend-soft-light" :style="{ background: `linear-gradient(135deg, rgb(${vibe.accent} / 0.5), transparent 60%)` }" />
            <div class="pointer-events-none absolute inset-0 mix-blend-screen opacity-0 transition-opacity duration-300 group-hover/img:opacity-100" :style="glowStyle" />
            <div class="absolute inset-0 bg-gradient-to-t from-romara-green-dark/90 via-romara-green-dark/25 to-transparent" />

            <!-- Vibe silhouette at the foot of the image -->
            <svg class="pointer-events-none absolute inset-x-0 bottom-0 h-12 w-full text-romara-bone" viewBox="0 0 400 48" preserveAspectRatio="none" aria-hidden="true">
              <path v-if="vibe.silhouette === 'wave'" fill="currentColor" d="M0 30 C 60 12, 120 44, 200 28 S 340 10, 400 30 L400 48 L0 48 Z" />
              <path v-else-if="vibe.silhouette === 'peaks'" fill="currentColor" d="M0 48 L70 14 L120 36 L190 6 L250 34 L320 16 L400 44 L400 48 Z" />
              <path v-else-if="vibe.silhouette === 'skyline'" fill="currentColor" d="M0 48 V30 H30 V18 H60 V34 H95 V12 H130 V30 H165 V22 H205 V34 H240 V14 H280 V30 H315 V20 H355 V34 H400 V48 Z" />
              <path v-else fill="currentColor" d="M0 48 Q10 30 16 40 Q24 22 32 40 Q42 28 52 42 Q64 24 74 40 Q88 30 98 42 Q120 26 140 42 Q170 28 200 42 Q240 26 280 42 Q320 30 360 42 Q384 30 400 42 L400 48 Z" />
            </svg>

            <!-- Identity -->
            <div class="absolute inset-x-0 bottom-0 z-10 p-6 text-white sm:p-7">
              <span
                class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm"
                :style="{ backgroundColor: `rgb(${vibe.accent} / 0.28)`, borderColor: `rgb(${vibe.accent} / 0.5)` }"
              >
                <component :is="vibe.icon" class="h-3.5 w-3.5" />
                {{ vibe.label }}
              </span>
              <p class="mt-3 flex items-center gap-1.5 text-sm text-white/80">
                <IconMapPin class="h-4 w-4" />
                {{ destination.county }}
              </p>
              <h2 class="mt-1 font-heading text-3xl font-semibold leading-tight text-balance sm:text-4xl">
                {{ destination.name }}
              </h2>
            </div>
          </div>

          <!-- Right: detail -->
          <div class="dm-scroll relative flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10">
            <!-- vibe watermark -->
            <component :is="vibe.icon" class="pointer-events-none absolute -right-8 -top-8 h-44 w-44" :style="{ color: `rgb(${vibe.accent} / 0.06)` }" />

            <p class="dm-stagger relative text-base leading-relaxed text-romara-ink-soft" style="--d: 60ms">
              {{ destination.description }}
            </p>

            <!-- Stat row -->
            <dl class="dm-stagger relative mt-7 grid grid-cols-2 gap-3" style="--d: 130ms">
              <div class="rounded-2xl border border-romara-green/10 bg-white p-4">
                <dt class="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-romara-ink/45">
                  <IconCalendar class="h-3.5 w-3.5" :style="{ color: `rgb(${vibe.accent})` }" />
                  Best time
                </dt>
                <dd class="mt-1.5 font-heading text-lg font-semibold text-romara-green">{{ destination.bestTimeToVisit }}</dd>
              </div>
              <div class="rounded-2xl border border-romara-green/10 bg-white p-4">
                <dt class="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-romara-ink/45">
                  <IconClock class="h-3.5 w-3.5" :style="{ color: `rgb(${vibe.accent})` }" />
                  Ideal stay
                </dt>
                <dd class="mt-1.5 font-heading text-lg font-semibold text-romara-green">{{ destination.durationSuggestion }}</dd>
              </div>
            </dl>

            <!-- Activities -->
            <div v-if="destination.activities.length" class="dm-stagger relative mt-8" style="--d: 200ms">
              <h3 class="font-heading text-lg font-semibold text-romara-green">Things to do</h3>
              <ul class="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <li
                  v-for="(activity, i) in destination.activities"
                  :key="activity"
                  class="dm-chip group/chip flex items-center gap-3 rounded-xl border border-romara-green/10 bg-white px-3.5 py-3 transition-all duration-300 ease-out-expo hover:-translate-y-0.5"
                  :style="{ transitionDelay: `${i * 40}ms` }"
                  @mouseenter="(e) => (e.currentTarget as HTMLElement).style.borderColor = `rgb(${vibe.accent} / 0.5)`"
                  @mouseleave="(e) => (e.currentTarget as HTMLElement).style.borderColor = ''"
                >
                  <span
                    class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-300"
                    :style="{ backgroundColor: `rgb(${vibe.accent} / 0.12)`, color: `rgb(${vibe.accent})` }"
                  >
                    <component :is="vibe.icon" class="h-4 w-4" />
                  </span>
                  <span class="text-sm font-medium text-romara-ink">{{ activity }}</span>
                </li>
              </ul>
            </div>

            <!-- CTAs -->
            <div class="dm-stagger relative mt-9 flex flex-col gap-3 sm:flex-row" style="--d: 270ms">
              <a
                href="/booking"
                class="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-amber-fade px-6 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-glow-amber transition-transform duration-300 ease-out-expo hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-romara-amber/50"
              >
                Plan a trip here
                <IconArrowRight class="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
              </a>
              <a
                href="https://wa.me/254700123456"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center justify-center gap-2 rounded-full border border-romara-green/20 bg-white px-6 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-romara-green transition-colors duration-300 hover:border-romara-green/40 hover:bg-romara-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-romara-green/30"
              >
                <IconWhatsapp class="h-4 w-4 text-romara-amber" />
                Ask an expert
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.dm-enter-active,
.dm-leave-active {
  transition: opacity 0.3s ease;
}
.dm-enter-from,
.dm-leave-to {
  opacity: 0;
}
.dm-enter-active .dm-panel,
.dm-leave-active .dm-panel {
  transition: transform 0.44s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.44s ease;
}
.dm-enter-from .dm-panel,
.dm-leave-to .dm-panel {
  transform: translateY(28px) scale(0.97);
  opacity: 0;
}

/* Content staggers in after the panel settles.
   NB: the image uses a JS pointer-parallax transform, so it must NOT carry a
   competing CSS transform animation here. */
@media (prefers-reduced-motion: no-preference) {
  .dm-enter-active .dm-stagger {
    animation: dm-rise 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
    animation-delay: var(--d, 0ms);
  }
}
.dm-img {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes dm-rise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
}
</style>
