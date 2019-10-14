import axios, { Method } from 'axios';
// import router from '@/router';
import store from '@/store';
import NProgress from 'nprogress';
import { Notification, MessageBox, Loading } from 'element-ui';
import { RESULT_CODES, RELOGIN_STATUS, RELOGIN_CODES, RELOGIN_TITLE, RELOGIN_MESSAGE, REQUEST_TIMEOUT } from '@/config';
import { LoadingServiceOptions } from 'element-ui/types/loading';

const ERROR_MSG = '',
  DISPATCH_RELOGIN_PATH = 'logout',
  // RELOGIN_ROUTER_NAME = 'login',
  defaultLoadingOption: LoadingServiceOptions = {
    text: '加载中...',
    lock: true
  };

axios.defaults.timeout = REQUEST_TIMEOUT;
// 返回其他状态码
// FOCUS: 为什么要判断 200 - 500 的状态码？axios 默认是 200 - 300
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status < 500; // 默认的
};
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
NProgress.configure({
  showSpinner: false
});

// HTTP request 拦截
axios.interceptors.request.use(
  config => {
    NProgress.start();
    if (!config.headers) {
    } else {
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// HTTP response 拦截
axios.interceptors.response.use(
  res => {
    NProgress.done();
    const { status, statusText } = res,
      code = res.data.code;
    // 如果是401则跳转到登录页面
    if (status === RELOGIN_STATUS || code === '18999996') {
      MessageBox({
        title: RELOGIN_TITLE,
        message: RELOGIN_MESSAGE,
        type: 'warning',
        center: true,
        confirmButtonText: '跳转到登录页'
      }).then(() => {
        store.dispatch(DISPATCH_RELOGIN_PATH);
      });
    } else if (status !== 200) {
      Notification.error({
        title: '',
        message: status + '： ' + (statusText || ERROR_MSG)
      });
    }
    return res;
  },
  error => {
    NProgress.done();
    Notification.error({
      title: '',
      message: error.message || ERROR_MSG
    });
    return Promise.reject(error);
  }
);

export interface RequestOpts {
  url?: string;
  params?: Object;
  headers?: Object;
  axiosConfig?: Object;
  method?: string;
  isLoading?: boolean;
  isMessage?: boolean;
  idKey?: string;
  loadingOption?: LoadingServiceOptions;
}
export interface ResponseSuccessData<T> {
  msg: string;
  isSuccess: boolean;
  data: T;
  code: string;
}

export default <T>({ url = '', params = {}, headers = {}, axiosConfig = {}, method = 'post', isLoading = false, isMessage = true, idKey = 'userId', loadingOption = {} }): Promise<ResponseSuccessData<T>> => {
  let loadingInstance: any;
  if (isLoading) {
    loadingInstance = Loading.service({
      ...defaultLoadingOption,
      ...loadingOption
    });
  }
  const isGet = method === 'get';
  return axios({
    method: method as Method,
    [isGet ? 'params' : 'data']: {
      ...params
    },
    url: url,
    headers: headers,
    ...axiosConfig
  })
    .then(({ data = {} }) => {
      const { code, msg } = data,
        isMatchCode = RESULT_CODES.includes(code),
        _msg = msg || ERROR_MSG;
      // 如果 isMessage && 业务 code 不存在 resultCode 中，则显示错误提示
      if (isMessage && !isMatchCode) {
        Notification.error({
          title: '',
          message: _msg
        });
        if (RELOGIN_CODES.includes(code)) {
          store.dispatch(DISPATCH_RELOGIN_PATH);
        }
      }
      return {
        ...data,
        msg: _msg,
        isSuccess: isMatchCode
      };
    })
    .catch(error => {
      return error;
    })
    .finally(() => {
      if (isLoading) {
        setTimeout(() => {
          loadingInstance.close();
        }, 300);
      }
    });
};
