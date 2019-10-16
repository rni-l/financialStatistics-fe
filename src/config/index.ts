export const RESULT_CODES = ['200', 200, '00000000'];

export const RELOGIN_STATUS = 401;
export const RELOGIN_CODES = [555];
export const RELOGIN_TITLE = '警告';
export const RELOGIN_MESSAGE = '登录超时！请重新登录';

export const REQUEST_TIMEOUT = 60000;

// 当 VUE_APP_IS_VALIDATED_LOGIN_STATUS 为空值，则需要校验
export const isValidatedLoginStatus = !process.env.VUE_APP_IS_VALIDATED_LOGIN_STATUS;

// element-ui
export const EL_COMPONENT_SIZE = 'small';

export const NOT_HAVE_FOOTER_ROUTERS = ['news', 'home'];
