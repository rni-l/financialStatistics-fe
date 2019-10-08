// 检查 ios 环境
export const checkIfIos = () => {
  const ua = window.navigator.userAgent;
  return /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(ua);
};
// 检查 android 环境
export const checkIfAndroid = () => {
  const ua = window.navigator.userAgent;
  return /Android/i.test(ua);
};

export const isWeixinBrowser = function() {
  let ua = window.navigator.userAgent.toLowerCase(),
    isWeichat = /micromessenger/i.test(ua);

  return isWeichat;
};

export const getDeviceType = function() {
  let u = navigator.userAgent,
    isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
    isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
  if (isAndroid) {
    return 'android';
  } else if (isiOS) {
    return 'ios';
  }
};

export const getWindowHeight = () => document.documentElement.clientHeight;

export const formatNumber = (val, fixNum = 2) => {
  if (Object.prototype.toString.call(val) !== '[object Number]') return val;
  return parseFloat(val.toFixed(fixNum), 10);
};

export const formatPhone = val => {
  if (!val) return '';
  return `${val.slice(0, 3)}****${val.slice(7, 11)}`;
};

/**
 * 格式化金额
 */
export const formatPrice = (value, separate = ',') => {
  const valueType = typeof value;
  if (value === null) return '';
  if ((!value && value !== 0) || (valueType !== 'number' && valueType !== 'string')) return value;
  // 解析字符串
  const parseValue = parseInt(value);
  // 如果为 NaN 就跳出
  if (!parseValue && parseValue !== 0) return value;
  let _value = '' + parseValue,
    // 把小数部分取出
    decimals = ('' + value).split('.')[1];
  if (('' + value).split('')[('' + value).length - 1] === '.') {
    decimals = '.';
  } else {
    decimals = decimals ? '.' + decimals : '';
  }
  let prefix = '';
  // 处理负数
  if (_value[0] === '-') {
    _value = _value.slice(1);
    prefix = '-';
  }
  // 使用 i 记录次数
  let i = 1;
  return (
    prefix +
    _value.split('').reduceRight((accumulate, curValue, curIndex, arr) => {
      let value = curValue + accumulate;
      // 每过 3 位 就要加间隔符 && 第一位和最后一位不加
      if (i % 3 === 0 && i !== 1 && i !== arr.length) {
        value = separate + value;
      }
      i += 1;
      return value;
    }, '') +
    decimals
  );
};

export const formatInteger = (value) => {
  const valueType = typeof value;
  if (value === null) return '';
  if ((!value && value !== 0) || (valueType !== 'number' && valueType !== 'string')) return '';
  // 解析字符串
  const parseValue = parseInt(value);
  // 如果为 NaN 就跳出
  if (!parseValue && parseValue !== 0) return '';
  let _value = '' + parseValue,
    // 把小数部分取出
    decimals = ('' + value).split('.')[1];
  if (('' + value).split('')[('' + value).length - 1] === '.') {
    decimals = '.';
  } else {
    decimals = decimals ? '.' + decimals : '';
  }
  let prefix = '';
  // 处理负数
  if (_value[0] === '-') {
    _value = _value.slice(1);
    prefix = '-';
  }
  // 使用 i 记录次数
  let i = 1;
  return (
    prefix +
    _value.split('').reduceRight((accumulate, curValue, curIndex, arr) => {
      let value = curValue + accumulate;
      // 每过 3 位 就要加间隔符 && 第一位和最后一位不加
      if (i % 3 === 0 && i !== 1 && i !== arr.length) {
        value = separate + value;
      }
      i += 1;
      return value;
    }, '') +
    decimals
  );
};

export const isDef = val => {
  return val === undefined || val === null;
};

export function random(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

function handleNumberLastZeroAndPoint(source, value, formatValue) {
  // 如果最后一个字符是 .，补上去
  const arr = source.split(''),
    lastValue = arr[arr.length - 1];
  let showValue = '';
  if (lastValue === '.') {
    showValue = value + '.';
  } else if (lastValue === '0') {
    if (arr.length > 1 && arr[arr.length - 2] === '.') {
      showValue = value + '.0';
    } else if (arr.length > 2 && arr[arr.length - 3] === '.' && arr[arr.length - 2] === '0') {
      showValue = value;
    }
  } else {
    showValue = formatValue;
  }
  return showValue;
}

/**
 * 用于 cell
 * @param {number|string} val
 * @param {Function} formatValue 格式化要显示的值
 * @param {regexp} reFormatShowValue 反格式化正则
 * @param {regexp} saveNumber 将字符串去除所有非 number 的字符
 * @param {string} inputType 值类型，暂支持 number
 * @returns {Object} 返回一个对象
 * @property {string} showValue 要展示的值
 * @property {string|number} formatSource 要给到 js 用的值，根据 inputType 返回对应类型
 */
export const handleInputValue = (val, formatValue, reFormatShowValue, saveNumber, inputType) => {
  const isNum = inputType === 'number',
    // 是 number 类型，才格式化
    _val = isNum ? ('' + val).replace(saveNumber, '') : val,
    // 有传格式化函数，才需要反格式化
    source = isNum ? _val.replace(reFormatShowValue, '') : _val;
  let formatSource = source;
  if (isNum) {
    // Number('') 会返回 0 出来
    let tempValue = isDef(source) ? null : Number(source);
    formatSource = !tempValue && tempValue !== 0 ? null : formatNumber(tempValue);
  }
  let showValue = '';
  if (formatValue) {
    // showValue = formatValue(isNum ? formatSource : source);
    if (isNum && formatSource) {
      showValue = handleNumberLastZeroAndPoint(source, formatSource, formatValue(formatSource));
    } else {
      showValue = formatValue(source);
      if (showValue === '.') showValue = '';
    }
  } else {
    if (isNum) {
      showValue = handleNumberLastZeroAndPoint(source, formatSource, formatSource);
    } else {
      showValue = source;
    }
  }
  // console.log(_val, source, formatSource, showValue);
  return {
    showValue: isDef(showValue) ? '' : '' + showValue,
    formatSource
  };
};
