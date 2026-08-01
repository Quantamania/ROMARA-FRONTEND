<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import IconPhone from '@/components/icons/IconPhone.vue'
import IconWhatsapp from '@/components/icons/IconWhatsapp.vue'
import IconMail from '@/components/icons/IconMail.vue'
import IconHeadset from '@/components/icons/IconHeadset.vue'
import FaqSearchBar from '@/features/faq/components/FaqSearchBar.vue'
import FaqCategoryTabs from '@/features/faq/components/FaqCategoryTabs.vue'
import FaqAccordionList from '@/features/faq/components/FaqAccordionList.vue'
import faqsData from '@/data/faq.json'
import type { FaqCategory, FaqItem } from '@/features/faq/api/faq.api'

const allFaqs = faqsData as FaqItem[]

const searchQuery = ref('')
const selectedCategory = ref<FaqCategory | null>(null)

const categoryLabels: Record<FaqCategory, string> = {
  booking: 'Booking & Reservations',
  'airport-transfers': 'Airport Transfers',
  'safari-packages': 'Safari Packages',
  destinations: 'Destinations',
  payments: 'Payments & Pricing',
  safety: 'Travel Info & Safety',
  general: 'General Questions',
}

const hasActiveFilter = computed(function checkHasActiveFilter() {
  return searchQuery.value.trim() !== '' || selectedCategory.value !== null
})

const displayedFaqs = computed(function getDisplayedFaqs() {
  if (!hasActiveFilter.value) {
    return allFaqs.filter((faq) => faq.featured)
  }

  let result = allFaqs
  if (selectedCategory.value) {
    result = result.filter((faq) => faq.category === selectedCategory.value)
  }
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.trim().toLowerCase()
    result = result.filter(
      (faq) => faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query),
    )
  }
  return result
})

// Read-only shortcuts into the existing category filter — presentation only.
const popularTopics: { value: FaqCategory; label: string }[] = [
  { value: 'booking', label: 'Booking' },
  { value: 'safari-packages', label: 'Safari Packages' },
  { value: 'airport-transfers', label: 'Airport Transfers' },
  { value: 'payments', label: 'Payments' },
  { value: 'destinations', label: 'Destinations' },
  { value: 'safety', label: 'Travel & Safety' },
]

const sectionHeading = computed(function getSectionHeading() {
  if (!hasActiveFilter.value) return 'Top Questions'
  if (selectedCategory.value && !searchQuery.value.trim()) return categoryLabels[selectedCategory.value]
  return 'Search Results'
})
</script>

<template>
  <!-- Hero: CALM HELP-DESK SEARCH — light surface, comprehension over drama. No photo. -->
  <section class="relative overflow-hidden bg-romara-bone">
    <!-- Soft, quiet ambience: a faint green wash + blurred tint, no imagery -->
    <div class="pointer-events-none absolute inset-0 bg-green-fade opacity-[0.035]" aria-hidden="true" />
    <div class="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-romara-green-100/50 blur-3xl" aria-hidden="true" />
    <div class="pointer-events-none absolute -left-24 top-1/3 h-64 w-64 rounded-full bg-romara-amber-100/40 blur-3xl" aria-hidden="true" />

    <div class="romara-container relative py-14 sm:py-20 lg:py-24">
      <!-- Breadcrumbs -->
      <nav aria-label="Breadcrumb" class="mb-8 flex justify-center">
        <ol class="flex items-center gap-2 text-xs font-medium text-romara-ink-soft">
          <li><a href="/" class="transition-colors hover:text-romara-green">Home</a></li>
          <li aria-hidden="true" class="text-romara-green/30">/</li>
          <li class="text-romara-green">FAQ</li>
        </ol>
      </nav>

      <!-- One authored motion moment: the whole help-desk block settles in on load -->
      <div class="animate-fade-up">
        <div class="mx-auto max-w-2xl text-center">
          <h1 class="text-balance font-heading text-display font-semibold text-romara-green">
            Frequently Asked Questions
          </h1>
          <p class="mx-auto mt-5 max-w-xl text-base leading-relaxed text-romara-ink-soft sm:text-lg">
            Find answers to the most common questions about our tours, services and bookings — or search for
            something specific.
          </p>
        </div>

        <!-- Prominent search. The glass bar reads on a soft green console so it stays legible on the light hero. -->
        <div class="mx-auto mt-8 w-full max-w-xl">
          <div class="rounded-full bg-green-fade p-2 shadow-elevated">
            <FaqSearchBar v-model="searchQuery" />
          </div>
        </div>

        <!-- Popular topics — chip row scrolls horizontally on mobile, wraps + centers on desktop -->
        <div class="mx-auto mt-7 max-w-2xl">
          <p class="mb-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-romara-ink-soft">
            Popular topics
          </p>
          <div
            class="-mx-5 flex gap-2.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
          >
            <button
              v-for="topic in popularTopics"
              :key="topic.value"
              type="button"
              class="inline-flex min-h-[44px] shrink-0 items-center rounded-full border border-romara-green/15 bg-white px-4 py-2.5 text-sm font-medium text-romara-green shadow-soft transition-all duration-300 ease-out-expo hover:border-romara-green/30 hover:bg-romara-green hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-romara-amber/40"
              @click="selectedCategory = topic.value"
            >
              {{ topic.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Two-column help desk: sticky category nav (left) + answers (right) -->
  <section class="section-y bg-romara-bone">
    <div class="romara-container">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-[290px_1fr] lg:gap-12 xl:gap-16">
        <!-- Category nav — horizontal scroll chips on mobile, sticky vertical list on desktop -->
        <aside class="lg:sticky lg:top-28 lg:self-start">
          <p class="eyebrow mb-3">Explore topics</p>
          <h2 class="mb-6 font-heading text-2xl font-semibold text-romara-green">
            Browse by category
          </h2>
          <FaqCategoryTabs v-model="selectedCategory" />

          <div class="mt-8 hidden rounded-card border border-romara-green/10 bg-white p-6 shadow-soft lg:block">
            <p class="font-heading text-base font-semibold text-romara-green">Prefer to talk?</p>
            <p class="mt-2 text-sm leading-relaxed text-romara-ink-soft">
              Our team replies fast on WhatsApp — usually within the hour.
            </p>
            <a
              href="https://wa.me/254700123456"
              class="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-romara-green transition-colors hover:text-romara-amber"
            >
              <IconWhatsapp class="h-4 w-4 text-romara-amber" />
              Chat with us
            </a>
          </div>
        </aside>

        <!-- Answers -->
        <div class="min-w-0">
          <div class="mb-8 flex items-end justify-between gap-4">
            <div>
              <p class="eyebrow mb-3">Answers</p>
              <h2 class="font-heading text-display-sm font-semibold text-romara-green">{{ sectionHeading }}</h2>
            </div>
            <button
              v-if="hasActiveFilter"
              type="button"
              class="shrink-0 text-xs font-bold uppercase tracking-[0.14em] text-romara-green transition-colors hover:text-romara-amber"
              @click="searchQuery = ''; selectedCategory = null"
            >
              Clear filters
            </button>
          </div>

          <FaqAccordionList :faqs="displayedFaqs" />
        </div>
      </div>
    </div>
  </section>

  <!-- Still Have Questions — refined contact panel -->
  <section class="section-y bg-white">
    <div class="romara-container">
      <div class="relative overflow-hidden rounded-card bg-green-fade p-8 text-white shadow-elevated sm:p-12">
        <div class="absolute inset-0 bg-scrim-r" />
        <div class="relative flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center gap-5">
            <span class="glass flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-romara-amber-300">
              <IconHeadset class="h-8 w-8" />
            </span>
            <div>
              <p class="eyebrow text-romara-amber-300">
                
                Talk to us
              </p>
              <p class="mt-2 font-heading text-2xl font-semibold">Still have questions?</p>
              <p class="mt-1.5 max-w-md text-sm leading-relaxed text-white/75">
                Our friendly team is here to help you plan your perfect trip.
              </p>
            </div>
          </div>

          <div class="flex flex-wrap gap-3">
            <BaseButton as="a" href="tel:+254700123456" variant="amber">
              <IconPhone class="h-4 w-4" />
              Call Us
            </BaseButton>
            <BaseButton as="a" href="https://wa.me/254700123456" variant="ghost">
              <IconWhatsapp class="h-4 w-4" />
              WhatsApp
            </BaseButton>
            <BaseButton as="a" href="mailto:info@romaratours.com" variant="ghost">
              <IconMail class="h-4 w-4" />
              Email Us
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
