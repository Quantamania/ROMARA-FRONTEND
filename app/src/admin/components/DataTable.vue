<script setup lang="ts">
/**
 * Generic list component used across every admin section.
 * Desktop (≥640px): real <table>.
 * Mobile (<640px): each row becomes a card of label:value pairs —
 * horizontal-scroll tables are close to unreadable at phone widths,
 * so we transform rather than scroll.
 */
interface Column {
  key: string
  label: string
  primary?: boolean // shown as the card title on mobile
}

defineProps<{
  columns: Column[]
  rows: Record<string, any>[]
  emptyLabel?: string
}>()

defineEmits<{ rowClick: [row: Record<string, any>] }>()
</script>

<template>
  <div>
    <!-- Desktop / tablet table -->
    <table class="hidden sm:table w-full border-collapse text-sm">
      <thead>
        <tr class="border-b border-romara-ink/10 text-left">
          <th
            v-for="col in columns"
            :key="col.key"
            class="py-3 px-4 font-sans font-semibold text-romara-ink/60 uppercase tracking-wide text-xs"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, i) in rows"
          :key="i"
          class="border-b border-romara-ink/10 hover:bg-romara-cream cursor-pointer transition-colors"
          @click="$emit('rowClick', row)"
        >
          <td v-for="col in columns" :key="col.key" class="py-3 px-4 text-romara-ink">
            <slot :name="`cell-${col.key}`" :row="row">{{ row[col.key] }}</slot>
          </td>
        </tr>
        <tr v-if="rows.length === 0">
          <td :colspan="columns.length" class="py-8 text-center text-romara-ink/60">
            {{ emptyLabel || 'Nothing here yet.' }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Mobile stacked cards -->
    <div class="sm:hidden space-y-3">
      <button
        v-for="(row, i) in rows"
        :key="i"
        class="w-full text-left bg-white border border-romara-ink/10 rounded-lg p-4 active:bg-romara-cream"
        @click="$emit('rowClick', row)"
      >
        <p class="font-heading text-lg text-romara-ink mb-2">
          {{ row[columns.find(c => c.primary)?.key || columns[0].key] }}
        </p>
        <dl class="space-y-1">
          <div
            v-for="col in columns.filter(c => !c.primary)"
            :key="col.key"
            class="flex justify-between text-sm"
          >
            <dt class="text-romara-ink/60">{{ col.label }}</dt>
            <dd class="text-romara-ink">
              <slot :name="`cell-${col.key}`" :row="row">{{ row[col.key] }}</slot>
            </dd>
          </div>
        </dl>
      </button>
      <p v-if="rows.length === 0" class="text-center text-romara-ink/60 py-8">
        {{ emptyLabel || 'Nothing here yet.' }}
      </p>
    </div>
  </div>
</template>
