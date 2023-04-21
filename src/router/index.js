import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home/home-view.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/login-view.vue')
    }
  ]
})

export default router
