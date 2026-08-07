<script setup lang="ts">
import { computed } from 'vue'

/**
 * Editorial grid-line overlay — thin guide lines that expose how content is
 * placed, giving sections an art-directed "layout grid" structure rather than
 * a plain box. Drop inside a `relative` section as a background layer and keep
 * the real content in a sibling with `relative` so it sits above.
 *
 *   <section class="relative isolate ...">
 *     <GridLines fine-grid :columns="2" />
 *     <div class="romara-container relative">…content…</div>
 *   </section>
 */
interface Props {
  /** Line colour: 'dark' green lines for light backgrounds, 'light' white for dark. */
  variant?: 'dark' | 'light'
  /** Internal vertical guide lines between the two margins (evenly spaced). */
  columns?: number
  /** Faint blueprint background grid. */
  fineGrid?: boolean
  /** Crosshair ticks bracketing the content frame's corners. */
  ticks?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'dark',
  columns: 0,
  fineGrid: false,
  ticks: true,
})

const lineClass = computed(() => (props.variant === 'light' ? 'bg-white/[0.16]' : 'bg-romara-green/[0.14]'))
const gridTextClass = computed(() => (props.variant === 'light' ? 'text-white' : 'text-romara-green'))

const columnOffsets = computed(() =>
  props.columns > 0
    ? Array.from({ length: props.columns }, (_, i) => ((i + 1) / (props.columns + 1)) * 100)
    : [],
)

// position + translate to centre each crosshair on its corner
const corners = [
  'left-0 top-0 -translate-x-1/2 -translate-y-1/2',
  'right-0 top-0 translate-x-1/2 -translate-y-1/2',
  'left-0 bottom-0 -translate-x-1/2 translate-y-1/2',
  'right-0 bottom-0 translate-x-1/2 translate-y-1/2',
]
</script>

<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <!-- Blueprint background grid -->
    <div
      v-if="fineGrid"
      class="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(currentColor_1px,transparent_1px),linear-gradient(90deg,currentColor_1px,transparent_1px)] [background-size:46px_46px]"
      :class="gridTextClass"
    />

    <!-- Container-aligned guide lines -->
    <div class="romara-container h-full">
      <div class="relative h-full">
        <span class="absolute inset-y-0 left-0 w-px" :class="lineClass" />
        <span class="absolute inset-y-0 right-0 w-px" :class="lineClass" />

        <span
          v-for="offset in columnOffsets"
          :key="offset"
          class="absolute inset-y-0 w-px"
          :class="lineClass"
          :style="{ left: `${offset}%` }"
        />

        <template v-if="ticks">
          <span v-for="pos in corners" :key="pos" class="absolute h-2.5 w-2.5" :class="pos">
            <span class="absolute inset-x-0 top-1/2 h-px -translate-y-1/2" :class="lineClass" />
            <span class="absolute inset-y-0 left-1/2 w-px -translate-x-1/2" :class="lineClass" />
          </span>
        </template>
      </div>
    </div>
  </div>
</template>
