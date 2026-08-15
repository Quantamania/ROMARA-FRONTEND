<script setup lang="ts">
import { ref } from 'vue'
import IconChevronDown from '@/components/icons/IconChevronDown.vue'
import type { FaqItem } from '@/features/faq/api/faq.api'

interface Props {
  faqs: FaqItem[]
}

defineProps<Props>()

const openId = ref<string | null>(null)

function toggleFaq(id: string) {
  openId.value = openId.value === id ? null : id
}
</script>

<template>
  <div
    v-if="faqs.length === 0"
    class="rounded-card border border-romara-green/10 bg-romara-bone p-12 text-center"
  >
    <p class="text-sm leading-relaxed text-romara-ink-soft">
      No matching questions found. Please contact our team for further assistance.
    </p>
    <a
      href="/contact"
      class="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-romara-green transition-colors hover:text-romara-amber"
    >
      Contact Us
    </a>
  </div>

  <div v-else class="space-y-3">
    <div
      v-for="(faq, index) in faqs"
      :key="faq.id"
      v-scroll-reveal="{ delay: index * 60 }"
      class="group/faq overflow-hidden rounded-card border bg-white shadow-card transition-all duration-300 ease-out-expo"
      :class="openId === faq.id ? 'border-romara-amber/40 shadow-elevated' : 'border-romara-green/10 hover:-translate-y-0.5 hover:border-romara-green/25 hover:shadow-elevated'"
    >
      <button
        type="button"
        class="flex w-full items-center justify-between gap-5 px-6 py-5 text-left transition-colors sm:px-8 sm:py-6"
        :aria-expanded="openId === faq.id"
        @click="toggleFaq(faq.id)"
      >
        <span
          class="font-heading text-base font-semibold text-romara-green transition-colors duration-300 sm:text-lg"
          :class="openId !== faq.id && 'group-hover/faq:text-romara-amber'"
        >
          {{ faq.question }}
        </span>
        <span
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ease-out-expo"
          :class="openId === faq.id ? 'bg-romara-green text-white' : 'bg-romara-cream text-romara-amber'"
        >
          <IconChevronDown
            class="h-4 w-4 transition-transform duration-300 ease-out-expo"
            :class="openId === faq.id && 'rotate-180'"
          />
        </span>
      </button>

      <div
        class="grid transition-all duration-300 ease-in-out"
        :style="{ gridTemplateRows: openId === faq.id ? '1fr' : '0fr' }"
      >
        <div class="overflow-hidden">
          <p class="px-6 pb-6 pr-10 text-sm leading-relaxed text-romara-ink-soft sm:px-8 sm:pb-7">
            {{ faq.answer }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
