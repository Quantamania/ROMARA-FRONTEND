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
  published: 'border-romara-green text-romara-green',
  confirmed: 'border-romara-green text-romara-green',
  approved: 'border-romara-green text-romara-green',
  responded: 'border-romara-green text-romara-green',
  draft: 'border-ink-light text-romara-ink/60',
  pending: 'border-romara-amber text-romara-amber',
  new: 'border-romara-amber text-romara-amber',
  cancelled: 'border-romara-amber-dark text-romara-amber',
  closed: 'border-ink-light text-romara-ink/60',
}
</script>

<template>
  <span
    class="inline-flex items-center justify-center rounded-full border-2 border-dotted px-3 py-1 text-[11px] font-sans font-bold uppercase tracking-wider -rotate-3 select-none"
    :class="styles[status] || 'border-ink-light text-romara-ink/60'"
  >
    {{ status }}
  </span>
</template>
