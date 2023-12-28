import { createRouter, createWebHistory } from 'vue-router'
import { getCookie } from '@/utils/browserUtils'

const routes = [
  {
    meta: {
      title: 'Product'
    },
    path: '/product',
    name: 'product',
    component: () => import('@/views/ProductView.vue')
  },
  {
    meta: {
      title: 'Category'
    },
    path: '/category',
    name: 'category',
    component: () => import('@/views/CategoryView.vue')
  },
  {
    meta: {
      title: 'Forms'
    },
    path: '/forms',
    name: 'forms',
    component: () => import('@/views/FormsView.vue')
  },
  {
    meta: {
      title: 'Profile'
    },
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue')
  },
  {
    meta: {
      title: 'Ui'
    },
    path: '/ui',
    name: 'ui',
    component: () => import('@/views/UiView.vue')
  },
  {
    meta: {
      title: 'Responsive layout'
    },
    path: '/responsive',
    name: 'responsive',
    component: () => import('@/views/ResponsiveView.vue')
  },
  {
    meta: {
      title: 'Login'
    },
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    meta: {
      title: 'Error'
    },
    path: '/error',
    name: 'error',
    component: () => import('@/views/ErrorView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

router.beforeEach(async(to) => {
  const authCookie = getCookie('authCookie')

  if (!authCookie && to.path !== '/login') {
    router.push('/login')
  }
})

export default router
