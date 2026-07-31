import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import HomeView from '@/views/HomeView.vue'
import { adminRoutes, adminAuthGuard } from '@/admin/router/adminRoutes'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        { path: '', name: 'home', component: HomeView },
        { path: 'about', name: 'about', component: () => import('@/views/AboutView.vue') },
        { path: 'safari-packages', name: 'safari-packages', component: () => import('@/views/SafariPackagesView.vue') },
        { path: 'safari-packages/:slug', name: 'safari-package-detail', component: () => import('@/views/SafariPackageDetailView.vue') },
        { path: 'day-trips', name: 'day-trips', component: () => import('@/views/DayTripsView.vue') },
        { path: 'day-trips/:slug', name: 'day-trip-detail', component: () => import('@/views/DayTripDetailView.vue') },
        { path: 'airport-transfers', name: 'airport-transfers', component: () => import('@/views/AirportTransfersView.vue') },
        { path: 'airport-transfers/book', name: 'airport-transfers-book', component: () => import('@/views/AirportTransferBookingView.vue') },
        { path: 'destinations', name: 'destinations', component: () => import('@/views/DestinationsView.vue') },
        { path: 'destinations/directory', name: 'destinations-directory', component: () => import('@/views/DestinationDetailView.vue') },
        { path: 'gallery', name: 'gallery', component: () => import('@/views/GalleryView.vue') },
        { path: 'reviews', name: 'reviews', component: () => import('@/views/ReviewsView.vue') },
        { path: 'faq', name: 'faq', component: () => import('@/views/FaqView.vue') },
        { path: 'blog', name: 'blog', component: () => import('@/views/BlogView.vue') },
        { path: 'blog/:slug', name: 'blog-post', component: () => import('@/views/BlogPostView.vue') },
        { path: 'contact', name: 'contact', component: () => import('@/views/ContactView.vue') },
        { path: 'booking', name: 'booking', component: () => import('@/views/BookingView.vue') },
        { path: 'book-now', redirect: '/booking' },
      ],
    },
    ...adminRoutes,
  ],
})

router.beforeEach(async (to, _from, next) => {
  const result = await adminAuthGuard(to)
  if (result === true) {
    next()
  } else {
    next(result)
  }
})

export default router