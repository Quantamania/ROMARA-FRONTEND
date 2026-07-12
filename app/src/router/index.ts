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
        // Add the rest of the routes from the frontend file-structure guide here as
        // each view gets built, e.g.:
        // { path: 'about', name: 'about', component: () => import('@/views/AboutView.vue') },
        // { path: 'safari-packages', name: 'safari-packages', component: () => import('@/views/SafariPackagesView.vue') },
      ],
    },
  ],
})

export default router