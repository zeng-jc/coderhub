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
        title: '首页',
        isNavbar: true
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/signin/signin-view.vue'),
      meta: {
        title: '登录',
        isNavbar: false
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/signup/signup-view.vue'),
      meta: {
        title: '注册',
        isNavbar: false
      }
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('../views/detail/detail-view.vue'),
      meta: {
        title: '详情',
        isNavbar: true
      }
    },
    {
      path: '/user/:username',
      name: 'user',
      component: () => import('../views/user/user-view.vue'),
      meta: {
        title: '用户主页',
        isNavbar: true
      }
    },
    {
      path: '/user/edit',
      name: 'edituser',
      component: () => import('../views/edituser/edituser-view.vue'),
      meta: {
        title: '个人资料编辑',
        isNavbar: true
      }
    }
  ]
})

router.beforeEach((to) => {
  // 如果进入edituser路由，且没有登录，就会重定向到login
  if (to.name === 'edituser' && !localStorage.getItem('token') && to.name !== 'signin') {
    return { name: 'signin' }
  }
  if (to.meta.title) {
    document.title = to.meta.title
  }
})

export default router
