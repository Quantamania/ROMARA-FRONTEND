import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import HomeView from '@/views/HomeView.vue'
import { adminRoutes, adminAuthGuard } from '@/admin/router/adminRoutes'

const router = createRouter({
  history: createWebHistory(),
  // Always land somewhere sensible after a navigation:
  //  - back / forward restores the exact position the user left,
  //  - an in-page #hash scrolls to that element (offset for the fixed nav),
  //  - changing only the query on the SAME page (filters, wizard steps) holds
  //    position so the page doesn't jump under the user,
  //  - every other navigation starts at the top so a new page (or a form the
  //    user was sent to) begins at the beginning, not wherever they last were.
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 80, behavior: 'smooth' }
    if (to.path === from.path) return {}
    return { top: 0, left: 0 }
  },
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
        { path: 'vehicle-hire', name: 'vehicle-hire', component: () => import('@/views/VehicleHireView.vue') },
        { path: 'hire-a-vehicle', redirect: '/vehicle-hire' },
        // Where the "pay for your booking" links in our emails land. ?ref=
        // pre-fills the reference; the customer still confirms with their email.
        { path: 'pay', name: 'pay', component: () => import('@/views/PayView.vue') },
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