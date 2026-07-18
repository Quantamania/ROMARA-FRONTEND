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

const sectionHeading = computed(function getSectionHeading() {
  if (!hasActiveFilter.value) return 'Top Questions'
  if (selectedCategory.value && !searchQuery.value.trim()) return categoryLabels[selectedCategory.value]
  return 'Search Results'
})
</script>

<template>
  <!-- Hero: premium centered composition, glass search bar as the focal element -->
  <section class="relative isolate min-h-[460px] overflow-hidden bg-romara-green text-white sm:min-h-[500px]">
    <img
      src="/src/assets/images/faq/hero.png"
      alt="Safari vehicle at sunset"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 bg-black/65" />

    <div class="romara-container relative flex min-h-[460px] flex-col items-center justify-center py-16 text-center sm:min-h-[500px]">
      <h1 class="font-heading text-4xl font-bold leading-tight sm:text-5xl">
        Frequently Asked <span class="text-romara-amber">Questions</span>
      </h1>
      <p class="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/80">
        Find answers to the most common questions about our tours, services and bookings.
      </p>

      <div class="mt-8 w-full max-w-xl">
        <FaqSearchBar v-model="searchQuery" />
      </div>
    </div>
  </section>

  <!-- Browse by Category -->
  <section class="romara-container py-16">
    <div class="mb-8 text-center">
      <h2 class="text-2xl font-bold text-romara-green sm:text-3xl">Browse by Category</h2>
      <span class="mx-auto mt-2 block h-1 w-14 rounded bg-romara-amber" />
    </div>

    <FaqCategoryTabs v-model="selectedCategory" />
  </section>

  <!-- Questions -->
  <section class="romara-container pb-16">
    <div class="mb-6 flex items-center justify-between gap-4">
      <h2 class="text-2xl font-bold text-romara-green sm:text-3xl">{{ sectionHeading }}</h2>
      <button
        v-if="hasActiveFilter"
        type="button"
        class="shrink-0 text-xs font-semibold text-romara-green underline hover:text-romara-amber"
        @click="searchQuery = ''; selectedCategory = null"
      >
        Clear filters
      </button>
    </div>

    <FaqAccordionList :faqs="displayedFaqs" />
  </section>

  <!-- Still Have Questions — refined, subtle contact panel -->
  <section class="romara-container pb-16">
    <div class="flex flex-col gap-8 rounded-2xl bg-gradient-to-br from-romara-cream to-white p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
      <div class="flex items-center gap-4">
        <span class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-romara-green shadow-sm">
          <IconHeadset class="h-7 w-7" />
        </span>
        <div>
          <p class="text-lg font-bold text-romara-green">Still have questions?</p>
          <p class="mt-1 text-sm text-romara-ink/60">Our friendly team is here to help you plan your perfect trip.</p>
        </div>
      </div>

      <div class="flex flex-wrap gap-3">
        <BaseButton as="a" href="tel:+254700123456" variant="outline">
          <IconPhone class="h-4 w-4" />
          Call Us
        </BaseButton>
        <BaseButton as="a" href="https://wa.me/254700123456" variant="outline">
          <IconWhatsapp class="h-4 w-4" />
          Chat on WhatsApp
        </BaseButton>
        <BaseButton as="a" href="mailto:info@romaratours.com" variant="outline">
          <IconMail class="h-4 w-4" />
          Email Us
        </BaseButton>
      </div>
    </div>
  </section>
</template>