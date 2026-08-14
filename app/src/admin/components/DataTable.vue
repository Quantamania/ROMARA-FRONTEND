<script setup lang="ts">
/**
 * Generic list component used across every admin section.
 * Desktop (≥640px): real <table>.
 * Mobile (<640px): each row becomes a card of label:value pairs —
 * horizontal-scroll tables are close to unreadable at phone widths,
 * so we transform rather than scroll.
 *
 * Styling comes from the .admin-* classes in assets/main.css, so the whole
 * panel restyles from one place.
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
    <table class="hidden sm:table w-full border-collapse">
      <thead>
        <tr class="border-b border-romara-ink/10">
          <th v-for="col in columns" :key="col.key" class="admin-th">
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, i) in rows"
          :key="i"
          class="admin-row"
          @click="$emit('rowClick', row)"
        >
          <td v-for="col in columns" :key="col.key" class="admin-td">
            <slot :name="`cell-${col.key}`" :row="row">
              <span :class="col.primary && 'font-medium'">{{ row[col.key] }}</span>
            </slot>
          </td>
        </tr>
        <tr v-if="rows.length === 0">
          <td :colspan="columns.length" class="py-12 text-center text-sm text-romara-ink-soft">
            {{ emptyLabel || 'Nothing here yet.' }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Mobile stacked cards -->
    <div class="sm:hidden divide-y divide-romara-ink/[0.07]">
      <button
        v-for="(row, i) in rows"
        :key="i"
        class="w-full text-left p-4 transition-colors active:bg-romara-amber-100/40"
        @click="$emit('rowClick', row)"
      >
        <p class="font-heading text-lg text-romara-ink mb-2">
          {{ row[columns.find(c => c.primary)?.key || columns[0].key] }}
        </p>
        <dl class="space-y-1">
          <div
            v-for="col in columns.filter(c => !c.primary)"
            :key="col.key"
            class="flex justify-between gap-4 text-sm"
          >
            <dt class="text-romara-ink-soft">{{ col.label }}</dt>
            <dd class="text-romara-ink text-right">
              <slot :name="`cell-${col.key}`" :row="row">{{ row[col.key] }}</slot>
            </dd>
          </div>
        </dl>
      </button>
      <p v-if="rows.length === 0" class="text-center text-sm text-romara-ink-soft py-12">
        {{ emptyLabel || 'Nothing here yet.' }}
      </p>
    </div>
  </div>
</template>
