import regexp from '@/utils/regexp';

export const ID_CARD_MAX_LENGTH = 20;
export const CE_CUS_REGISTER_ADDRESS_LENGTH = 200;
export const TEXT_LENGTH = 200;
export const AUTHORITY_LENGTH = 100;
export const EMAIL_LENGTH = 100;
export const UNIT_LENGTH = 100;
export const PHONE_LENGTH = 16;
export const FIX_PHONE_LENGTH = 16;
export const NAME_LENGTH = 32;

// export const AREA_CONFIG = [
//   {
//     type: 'array',
//     required: true,
//     validator: (rule, value) => {
//       return !!value.length && value.every(v => v);
//     },
//     message: '请选择省市地址'
//   }
// ];

// export const customerBaseInfo = {
//   default: () => ({
//     customerName: '',
//     certId: '',
//     sex: '1',
//     folk: '',
//     ceCusRegisterAddress: '',
//     authority: '',
//     validDateArr: ['', '']
//   }),
//   type: Object
// };

// export const phoneRules = (txt = '手机号码') => [
//   {
//     type: 'string',
//     required: true,
//     message: `请输入${txt}`
//   },
//   {
//     type: 'string',
//     required: true,
//     validator: (rule, value) => regexp.phone.test('' + value),
//     message: `请输入正确格式的${txt}`
//   }
// ];

// export const fixPhoneRules = (txt = '单位联系电话') => [
//   {
//     type: 'string',
//     required: true,
//     message: `请输入${txt}`
//   },
//   {
//     type: 'string',
//     required: true,
//     isReturnResult: true,
//     validator: (rule, value) => regexp.fixPhoneLength.test('' + value),
//     message: `请输入 11 - 16 位的${txt}`
//   },
//   {
//     type: 'string',
//     required: true,
//     isReturnResult: true,
//     validator: (rule, value) => regexp.fixPhone.test('' + value),
//     message: `请输入正确格式的${txt}`
//   }
// ];

// export const emailRules = (txt = '邮箱地址') => [
//   {
//     type: 'string',
//     required: true,
//     message: `请输入${txt}`
//   },
//   {
//     type: 'string',
//     required: true,
//     max: EMAIL_LENGTH,
//     message: `${txt}不能超过 ${EMAIL_LENGTH} 个字符`
//   },
//   {
//     type: 'string',
//     required: true,
//     validator: (rule, value) => regexp.email.test(value),
//     message: `请输入正确格式的${txt}`
//   }
// ];

export const checkExceed = (txt: string, len = 10, callback?: Function) => {
  const val = [
    {
      type: 'string',
      required: true,
      message: `请输入${txt}`
    },
    {
      type: 'string',
      required: true,
      validator: (rule: any, value: string | number) => {
        return ('' + value).length <= len;
      },
      message: `${txt}长度不能大于${len}`
    }
  ];
  return !callback ? val : callback(val);
};

export const checkMinAndMax = (txt: string, min = 0, max = 9999999999.99) => {
  return {
    type: 'string',
    required: true,
    validator: (rule: any, value: number) => {
      return value > min && value < max;
    },
    message: `${txt}不能小于${min}，大于${max}`
  };
};

// export const checkIdCard = () => {
//   return {
//     type: 'string',
//     required: true,
//     validator: (rule, value) => {
//       return value.length >= 15 && value.length <= ID_CARD_MAX_LENGTH;
//     },
//     message: `身份证号码格式不正确`
//   };
// };

// export const checkMixtureText = (txt, len = 32) => {
//   return [
//     {
//       type: 'string',
//       required: true,
//       message: `请输入${txt}`
//     },
//     {
//       type: 'string',
//       required: true,
//       validator: (rule, value) => {
//         return !regexp.haveNumber.test(value);
//       },
//       message: `请包含中文或英文字符`
//     },
//     {
//       type: 'string',
//       required: true,
//       validator: (rule, value) => {
//         return value.length <= len;
//       },
//       message: `${txt}长度不能超过${len}`
//     }
//   ];
// };

// export const checkName = (txt, len = NAME_LENGTH) => {
//   return [
//     {
//       type: 'string',
//       required: true,
//       message: `请输入${txt}`
//     },
//     {
//       type: 'string',
//       required: true,
//       validator: (rule, value) => {
//         return regexp.forbidNumber.test(value) && value.length >= 2;
//       },
//       message: `请输入完整的${txt}`
//     },
//     {
//       type: 'string',
//       required: true,
//       validator: (rule, value) => {
//         return value.length <= len;
//       },
//       message: `${txt}长度不能超过${len}`
//     }
//   ];
// };

// export const removeNumber = val => {
//   return val.replace(regexp.removeNumberGlobal, '');
// };
