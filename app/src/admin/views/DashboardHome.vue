<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { supabase } from '@/shared/api/supabaseClient'
const counts = ref({
  tours: 0,
  newBookingRequests: 0,
  newEnquiries: 0,
  newVehicleHire: 0,
  newTransfers: 0,
  pendingTestimonials: 0,
})

const revenue = ref(0)
const loading = ref(true)

onMounted(async () => {
  // One RPC instead of six count queries. Each round trip to the hosted project
  // costs ~190ms, so six of them made the dashboard the slowest page in the panel.
  const { data, error } = await supabase.rpc('admin_dashboard_counts')
  loading.value = false
  if (error || !data) return

  counts.value = {
    tours: data.published_tours ?? 0,
    newBookingRequests: data.new_booking_requests ?? 0,
    newEnquiries: data.new_enquiries ?? 0,
    newVehicleHire: data.new_vehicle_hire ?? 0,
    newTransfers: data.new_transfers ?? 0,
    pendingTestimonials: data.unfeatured_testimonials ?? 0,
  }
  revenue.value = Number(data.revenue_kes) || 0
})

const cards = [
  { key: 'newEnquiries', label: 'New enquiries', to: '/admin/enquiries' },
  { key: 'newBookingRequests', label: 'New booking requests', to: '/admin/booking-requests' },
  { key: 'newTransfers', label: 'New airport transfers', to: '/admin/transfers' },
  { key: 'newVehicleHire', label: 'New vehicle hire requests', to: '/admin/vehicle-hire' },
  { key: 'pendingTestimonials', label: 'Testimonials to feature', to: '/admin/testimonials' },
  { key: 'tours', label: 'Tour packages', to: '/admin/tours' },
] as const
</script>
<template>
  <div>
    <p class="admin-eyebrow">Overview</p>
    <h1 class="admin-title">Welcome back</h1>
    <span class="admin-title-rule" />

    <div class="flex flex-wrap items-baseline justify-between gap-3 -mt-3 mb-7">
      <p class="text-sm text-romara-ink-soft">Here's what needs your attention today.</p>
      <p class="text-sm text-romara-ink-soft">
        Collected to date
        <span class="font-heading text-lg text-romara-ink ml-1.5">
          KES {{ revenue.toLocaleString() }}
        </span>
      </p>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
      <RouterLink
        v-for="card in cards"
        :key="card.key"
        :to="card.to"
        class="admin-card p-5 group transition-[border-color,box-shadow] duration-150
               hover:border-romara-amber/60 hover:shadow-card"
      >
        <p class="font-heading text-[2rem] leading-none text-romara-ink">{{ counts[card.key] }}</p>
        <p class="text-sm text-romara-ink-soft mt-1.5">{{ card.label }}</p>
        <span class="block w-6 h-[2px] bg-romara-amber/0 group-hover:bg-romara-amber rounded-full mt-3 transition-colors" />
      </RouterLink>
    </div>
    <div class="admin-card p-6">
      <h2 class="font-heading text-xl text-romara-ink mb-3">Quick actions</h2>
      <div class="flex flex-wrap gap-3">
        <RouterLink
          to="/admin/tours/new"
          class="admin-btn"
        >
          + Add tour package
        </RouterLink>
        <RouterLink
          to="/admin/blog"
          class="bg-romara-cream hover:bg-white text-romara-ink text-sm font-medium rounded-card px-4 py-2.5 transition-colors border border-romara-ink/10"
        >
          + Write blog post
        </RouterLink>
        <RouterLink
          to="/admin/promotions"
          class="bg-romara-cream hover:bg-white text-romara-ink text-sm font-medium rounded-card px-4 py-2.5 transition-colors border border-romara-ink/10"
        >
          + Add promotion
        </RouterLink>
      </div>
    </div>
  </div>
</template>