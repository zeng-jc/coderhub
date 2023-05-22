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
      component: () => import('../views/home/home-view.vue'),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/login-view.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/signup/signup-view.vue'),
      meta: {
        title: '注册'
      }
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('../views/detail/detail-view.vue'),
      meta: {
        title: '详情'
      }
    },
    {
      path: '/user/:username',
      name: 'user',
      component: () => import('../views/user/user-view.vue'),
      meta: {
        title: '用户主页'
      }
    }
  ]
})

router.beforeEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
})

export default router
