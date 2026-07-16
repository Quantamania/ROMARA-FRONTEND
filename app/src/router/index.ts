import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import HomeView from '@/views/HomeView.vue'

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
        { path: 'day-trips', name: 'day-trips', component: () => import('@/views/DayTripsView.vue') },
        { path: 'airport-transfers', name: 'airport-transfers', component: () => import('@/views/AirportTransfersView.vue') },
        { path: 'airport-transfers/book', name: 'airport-transfers-book', component: () => import('@/views/AirportTransferBookingView.vue') },
        { path: 'destinations', name: 'destinations', component: () => import('@/views/DestinationsView.vue') },
        { path: 'destinations/directory', name: 'destinations-directory', component: () => import('@/views/DestinationDetailView.vue') },
        { path: 'gallery', name: 'gallery', component: () => import('@/views/GalleryView.vue') }
        // Add the rest of the routes from the frontend file-structure guide here as
        // each view gets built, e.g.:
        // { path: 'about', name: 'about', component: () => import('@/views/AboutView.vue') },
        // { path: 'safari-packages', name: 'safari-packages', component: () => import('@/views/SafariPackagesView.vue') },
      ],
    },
  ],
})

export default router