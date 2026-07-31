<script setup lang="ts">
import { computed, ref } from 'vue'
import PageHero from '@/components/ui/PageHero.vue'
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

const sectionHeading = computed(function getSectionHeading() {
  if (!hasActiveFilter.value) return 'Top Questions'
  if (selectedCategory.value && !searchQuery.value.trim()) return categoryLabels[selectedCategory.value]
  return 'Search Results'
})
</script>

<template>
  <!-- Hero: editorial masthead with a glass search bar as the focal element -->
  <PageHero
    title="Frequently Asked Questions"
    eyebrow="Help Center"
    subtitle="Find answers to the most common questions about our tours, services and bookings — or search for something specific."
    image="/src/assets/images/faq/hero.png"
    size="lg"
    align="center"
    :breadcrumbs="[{ label: 'Home', href: '/' }, { label: 'FAQ' }]"
  >
    <div class="mx-auto w-full max-w-xl">
      <FaqSearchBar v-model="searchQuery" />
    </div>
  </PageHero>

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
