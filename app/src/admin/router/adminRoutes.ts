import type { RouteRecordRaw } from 'vue-router'
import { useAdminAuth } from '@/admin/composables/useAdminAuth'

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('@/admin/views/AdminLogin.vue'),
    meta: { public: true },
  },
  {
    path: '/admin',
    component: () => import('@/admin/layouts/AdminLayout.vue'),
    meta: { requiresAdmin: true },
    children: [
      { path: '', name: 'admin-dashboard', component: () => import('@/admin/views/DashboardHome.vue') },
      { path: 'tours', name: 'admin-tours', component: () => import('@/admin/views/TourPackagesView.vue') },
      { path: 'tours/new', name: 'admin-tour-new', component: () => import('@/admin/views/TourPackageForm.vue') },
      { path: 'tours/:id', name: 'admin-tour-edit', component: () => import('@/admin/views/TourPackageForm.vue') },
      { path: 'bookings', name: 'admin-bookings', component: () => import('@/admin/views/BookingsView.vue') },
      { path: 'booking-requests', name: 'admin-booking-requests', component: () => import('@/admin/views/BookingRequestsView.vue') },
      { path: 'team', name: 'admin-team', component: () => import('@/admin/views/TeamView.vue') },
      { path: 'payments', name: 'admin-payments', component: () => import('@/admin/views/PaymentsView.vue') },
      { path: 'transfers', name: 'admin-transfers', component: () => import('@/admin/views/TransferBookingsView.vue') },
      { path: 'vehicle-hire', name: 'admin-vehicle-hire', component: () => import('@/admin/views/VehicleHireView.vue') },
      { path: 'enquiries', name: 'admin-enquiries', component: () => import('@/admin/views/EnquiriesView.vue') },
      { path: 'blog', name: 'admin-blog', component: () => import('@/admin/views/BlogView.vue') },
      { path: 'testimonials', name: 'admin-testimonials', component: () => import('@/admin/views/TestimonialsView.vue') },
      { path: 'promotions', name: 'admin-promotions', component: () => import('@/admin/views/PromotionsView.vue') },
    ],
  },
]

export async function adminAuthGuard(to: any) {
  if (!to.meta.requiresAdmin) return true
  const { isAdmin, checkAdminStatus } = useAdminAuth()
  await checkAdminStatus()
  if (!isAdmin.value) {
    return { name: 'admin-login', query: { redirect: to.fullPath } }
  }
  return true
}