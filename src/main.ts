import './styles/index.scss'
import 'babel-polyfill'
import installDepend from './utils/installDepend'
import Element from 'element-ui'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import initPermission from './router/permission'
import store from './store/index'
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';

const isDev = process.env.VUE_APP_MODE === 'develop',
  isTest = process.env.VUE_APP_MODE === 'beta'
Vue.config.devtools = process.env.VUE_APP_MODE !== 'production'
Vue.config.productionTip = process.env.VUE_APP_MODE !== 'production'
Vue.use(Element)
Vue.use(Avue)

installDepend()
initPermission()

function mount() {
  console.log('mount')
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

;(async () => {
  // const isLogin = getStore({ name: 'isLogin' });
  // if (isLogin) {
  //   const userInfo = getStore({ name: 'userInfo' });
  //   // 已登录
  //   if (userInfo && userInfo.adminUserId) {
  //     store.commit('updateUserInfo', userInfo);
  //     store.commit('updateIsLogin', true);
  //   }
  // }
  mount()
})()
