<script setup lang="ts">
/**
 * Signature element of the admin UI: content status shown as a
 * passport-stamp badge rather than a generic pill, tying the CMS
 * chrome back to the travel/tourism subject without being literal.
 */
const props = defineProps<{
  status: string // 'published' | 'draft' | 'pending' | 'approved' | 'confirmed' | 'cancelled' | 'new' | 'responded' | 'closed'
}>()

const styles: Record<string, string> = {
  published: 'border-safari-green text-safari-green',
  confirmed: 'border-safari-green text-safari-green',
  approved: 'border-safari-green text-safari-green',
  responded: 'border-safari-green text-safari-green',
  draft: 'border-ink-light text-ink-light',
  pending: 'border-ochre text-ochre',
  new: 'border-terracotta text-terracotta',
  cancelled: 'border-terracotta-dark text-terracotta-dark',
  closed: 'border-ink-light text-ink-light',
}
</script>

<template>
  <span
    class="inline-flex items-center justify-center rounded-full border-2 border-dotted px-3 py-1 text-[11px] font-sans font-bold uppercase tracking-wider -rotate-3 select-none"
    :class="styles[status] || 'border-ink-light text-ink-light'"
  >
    {{ status }}
  </span>
</template>
