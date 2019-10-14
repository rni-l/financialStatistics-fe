import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '*',
      redirect: { name: '404' }
    },
    {
      path: '/',
      name: 'layout',
      component: () => import('@/layout/Index.vue'),
      children: [
        {
          path: '/store',
          name: 'store',
          component: () => import('@/views/store/Index.vue')
        },
        {
          path: '/staff',
          name: 'staff',
          component: () => import('@/views/staff/Index.vue')
        },
        {
          path: '/job',
          name: 'job',
          component: () => import('@/views/job/Index.vue')
        },
        {
          path: '/bill',
          name: 'bill',
          component: () => import('@/views/bill/Index.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Index.vue')
    }
  ]
})
