<script setup lang="ts">
/**
 * Signature element of the admin UI: content status shown as a
 * passport-stamp badge rather than a generic pill, tying the CMS
 * chrome back to the travel/tourism subject without being literal.
 */
const props = defineProps<{
  status: string // 'published' | 'draft' | 'pending' | 'approved' | 'confirmed' | 'cancelled' | 'new' | 'responded' | 'closed' | 'quoted' | 'completed'
}>()

const styles: Record<string, string> = {
  published: 'border-romara-green text-romara-green',
  confirmed: 'border-romara-green text-romara-green',
  approved: 'border-romara-green text-romara-green',
  responded: 'border-romara-green text-romara-green',
  completed: 'border-romara-green text-romara-green',
  draft: 'border-romara-ink/25 text-romara-ink-soft',
  pending: 'border-romara-amber text-romara-amber',
  new: 'border-romara-amber text-romara-amber',
  quoted: 'border-romara-amber text-romara-amber',
  cancelled: 'border-romara-amber-600 text-romara-amber-600',
  closed: 'border-romara-ink/25 text-romara-ink-soft',
}
</script>

<template>
  <span
    class="inline-flex items-center justify-center rounded-full border-2 border-dotted px-3 py-1 text-[11px] font-sans font-bold uppercase tracking-wider -rotate-3 select-none"
    :class="styles[status] || 'border-romara-ink/25 text-romara-ink-soft'"
  >
    {{ status }}
  </span>
</template>
