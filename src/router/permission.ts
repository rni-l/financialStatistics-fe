import router from '@/router';
import store from '@/store';
// import { Toast } from 'vant';
import { isValidatedLoginStatus } from '@/config';

/**
 * 不需要验证的路由，由路由 name 值组成
 * @const
 * @type {Array} errorRouters
 */
const loginRouters = ['login', 'register', 'forgetPwd'],
  NO_PERMISSION_ROUTER_NAME = 'errorNoPermission',
  HOME_PAGE = 'me',
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
  console.log('initPermission');
  // 导航钩子，每次路由变动生效前，都会检查登录状态
  router.beforeEach(async (to, from, next) => {
    const PATHNAME = to.name;
    console.log('PATHNAME:', PATHNAME);
    if (!toast) {
      // toast = Toast.loading({
      //   duration: 0, // 持续展示 toast
      //   forbidClick: true, // 禁用背景点击
      //   loadingType: 'spinner',
      //   message: '加载中...'
      // });
    }
    // isValidated 方便开发时，可定义是否要走验证流程
    if (isValidatedLoginStatus) {
    }
    return next();
  });

  router.afterEach(to => {
    console.log('afterEach:', to.name);
    if (to.meta.title) {
      document.title = to.meta.title;
    }
    window.scrollTo(0, 0);
    clearToast();
  });
};
