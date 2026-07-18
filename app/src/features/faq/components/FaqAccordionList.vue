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
  <div v-if="faqs.length === 0" class="rounded-xl bg-romara-cream/60 p-10 text-center">
    <p class="text-sm text-romara-ink/70">
      No matching questions found. Please contact our team for further assistance.
    </p>
    <a href="/contact" class="mt-3 inline-block text-sm font-semibold text-romara-green underline hover:text-romara-amber">
      Contact Us
    </a>
  </div>

  <div v-else class="divide-y divide-black/5 rounded-xl bg-white shadow-card">
    <div v-for="faq in faqs" :key="faq.id" class="px-5 sm:px-7">
      <button
        type="button"
        class="flex w-full items-center justify-between gap-4 py-5 text-left"
        :aria-expanded="openId === faq.id"
        @click="toggleFaq(faq.id)"
      >
        <span class="text-sm font-bold text-romara-green sm:text-base">{{ faq.question }}</span>
        <IconChevronDown
          class="h-4 w-4 shrink-0 text-romara-amber transition-transform duration-300"
          :class="openId === faq.id && 'rotate-180'"
        />
      </button>

      <div
        class="grid transition-all duration-300 ease-in-out"
        :style="{ gridTemplateRows: openId === faq.id ? '1fr' : '0fr' }"
      >
        <div class="overflow-hidden">
          <p class="pb-5 pr-8 text-sm leading-relaxed text-romara-ink/70">{{ faq.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>