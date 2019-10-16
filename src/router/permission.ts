import router from '@/router';
import store from '@/store';
import NProgress from 'nprogress';
import { isValidatedLoginStatus } from '@/config';

/**
 * 不需要验证的路由，由路由 name 值组成
 * @const
 * @type {Array} errorRouters
 */
const loginRouters = ['login', 'register', 'forgetPwd'],
  NO_PERMISSION_ROUTER_NAME = 'errorNoPermission',
  HOME_PAGE = 'bill',
  LOGIN = 'login',
  publicRouters = [];

let toast: any = false;

function clearToast() {
  if (toast) {
    toast.clear();
    toast = undefined;
  }
}

export default () => {
  // 导航钩子，每次路由变动生效前，都会检查登录状态
  router.beforeEach(async (to, from, next) => {
    const PATHNAME = to.name as string;
    NProgress.start();
    console.log('PATHNAME:', PATHNAME);
    // isValidated 方便开发时，可定义是否要走验证流程
    if (isValidatedLoginStatus) {
      const isLogin = store.state.user.isLogin
      console.log('isLogin:', isLogin)
      if (isLogin) {
        if (loginRouters.includes(PATHNAME)) {
          return next({ name: HOME_PAGE, replace: true })
        }
      } else {
        if (!loginRouters.includes(PATHNAME)) {
          return next({ name: LOGIN, replace: true })
        }
      }
    }
    return next();
  });

  router.afterEach(to => {
    console.log('afterEach:', to.name);
    if (to.meta.title) {
      document.title = to.meta.title;
    }
    NProgress.done();
    window.scrollTo(0, 0);
    clearToast();
  });
};
