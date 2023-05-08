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
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/signup/signup-view.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('../views/detail/detail-view.vue')
    },
    {
      path: '/user/:id',
      name: 'user',
      component: () => import('../views/user/user-view.vue')
    }
  ]
})

router.beforeEach((to) => {
  if (to.name === 'user' && !localStorage.getItem('token')) return router.replace('/login')
})

export default router
