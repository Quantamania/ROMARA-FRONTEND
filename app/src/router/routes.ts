import type { RouteRecordRaw } from 'vue-router'
import { adminRoutes } from '@/admin/router/adminRoutes'
export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: () => import('../views/HomeView.vue') },
  { path: '/about', name: 'About', component: () => import('../views/AboutView.vue') },
  { path: '/safari-packages', name: 'SafariPackages', component: () => import('../views/SafariPackagesView.vue') },
  { path: '/safari-packages/:slug', name: 'SafariPackageDetail', component: () => import('../views/SafariPackageDetailView.vue') },
  { path: '/day-trips', name: 'DayTrips', component: () => import('../views/DayTripsView.vue') },
  { path: '/airport-transfers', name: 'AirportTransfers', component: () => import('../views/AirportTransfersView.vue') },
  { path: '/destinations', name: 'Destinations', component: () => import('../views/DestinationsView.vue') },
  { path: '/destinations/:id', name: 'DestinationDetail', component: () => import('../views/DestinationDetailView.vue') },
  { path: '/gallery', name: 'Gallery', component: () => import('../views/GalleryView.vue') },
  { path: '/reviews', name: 'Reviews', component: () => import('../views/ReviewsView.vue') },
  { path: '/faq', name: 'Faq', component: () => import('../views/FaqView.vue') },
  { path: '/blog', name: 'Blog', component: () => import('../views/BlogView.vue') },
  { path: '/blog/:slug', name: 'BlogPost', component: () => import('../views/BlogPostView.vue') },
  { path: '/contact', name: 'Contact', component: () => import('../views/ContactView.vue') },
  { path: '/booking', name: 'Booking', component: () => import('../views/BookingView.vue') },
  ...adminRoutes,
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/HomeView.vue') },
]