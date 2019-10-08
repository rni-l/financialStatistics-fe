export default {
  phone: /^\d{11}$/,
  email: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
  captcha: /^.{4}$/,
  integer: /^[0123456789]+$/,
  floor: /^\d+(\.?\d{1,2})?$/,
  userId: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  secureWord: /(eval\()|(<script)/,
  pwd: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
  saveNumber: /[^\-?\d.]/g,
  replaceFormatTxt: /[,，\-\s]/g,
  replaceContactPhone: /[ +]/g, // 去除空格和 + 号
  haveNumber: /^[0-9]+$/, // 要有数字
  removeNumberGlobal: /[0-9]/g, // 要有数字
  forbidNumber: /^[^0-9]*$/ // 禁止数字
};
