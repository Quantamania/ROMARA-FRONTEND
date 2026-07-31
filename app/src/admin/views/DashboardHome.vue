<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { supabase } from '@/shared/api/supabaseClient'

const counts = ref({ tours: 0, pendingBookings: 0, newEnquiries: 0, pendingTestimonials: 0 })

onMounted(async () => {
  const [tours, bookings, enquiries, testimonials] = await Promise.all([
    supabase.from('tour_packages').select('id', { count: 'exact', head: true }).eq('published', true),
    supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('enquiries').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('testimonials').select('id', { count: 'exact', head: true }).eq('approved', false),
  ])
  counts.value = {
    tours: tours.count || 0,
    pendingBookings: bookings.count || 0,
    newEnquiries: enquiries.count || 0,
    pendingTestimonials: testimonials.count || 0,
  }
})

const cards = [
  { key: 'newEnquiries', label: 'New enquiries', to: '/admin/enquiries', accent: 'terracotta' },
  { key: 'pendingBookings', label: 'Bookings awaiting confirmation', to: '/admin/bookings', accent: 'ochre' },
  { key: 'pendingTestimonials', label: 'Testimonials to review', to: '/admin/testimonials', accent: 'safari' },
  { key: 'tours', label: 'Published tours', to: '/admin/tours', accent: 'ink' },
] as const
</script>

<template>
  <div>
    <h1 class="font-heading text-3xl text-romara-ink mb-1">Welcome back</h1>
    <p class="text-romara-ink/60 mb-8">Here's what needs your attention today.</p>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      <RouterLink
        v-for="card in cards"
        :key="card.key"
        :to="card.to"
        class="bg-white border border-romara-ink/10 rounded-xl p-5 hover:border-romara-amber transition-colors"
      >
        <p class="text-3xl font-heading text-romara-ink">{{ counts[card.key] }}</p>
        <p class="text-sm text-romara-ink/60 mt-1">{{ card.label }}</p>
      </RouterLink>
    </div>

    <div class="bg-white border border-romara-ink/10 rounded-xl p-6">
      <h2 class="font-heading text-xl text-romara-ink mb-3">Quick actions</h2>
      <div class="flex flex-wrap gap-3">
        <RouterLink
          to="/admin/tours/new"
          class="bg-romara-amber hover:bg-romara-amber text-white text-sm font-medium rounded-lg px-4 py-2.5 transition-colors"
        >
          + Add tour package
        </RouterLink>
        <RouterLink
          to="/admin/blog"
          class="bg-romara-cream hover:bg-romara-cream text-romara-ink text-sm font-medium rounded-lg px-4 py-2.5 transition-colors border border-romara-ink/10"
        >
          + Write blog post
        </RouterLink>
        <RouterLink
          to="/admin/promotions"
          class="bg-romara-cream hover:bg-romara-cream text-romara-ink text-sm font-medium rounded-lg px-4 py-2.5 transition-colors border border-romara-ink/10"
        >
          + Add promotion
        </RouterLink>
      </div>
    </div>
  </div>
</template>
