import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

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
    }
  ]
});
