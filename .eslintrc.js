module.exports = {
  root: true,
  parserOptions: {
    // parser: 'babel-eslint',
    parser: '@typescript-eslint/parser'
  },
  env: {
    browser: true
  },
  extends: ['plugin:vue/essential', 'standard', '@vue/typescript'],
  globals: {
    $config: true,
    CryptoJS: true,
    $: true,
    Swiper: true
  },
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    'no-restricted-syntax': 'off',
    'no-trailing-spaces': 'off', // 取消禁用行尾空格
    'prefer-template': 'off',
    'guard-for-in': 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    'space-before-function-paren': ['off'],
    semi: ['error', 'always'],
    indent: ['error', 2], // 强制使用2 个空格缩进
    'linebreak-style': ['off'],
    'one-var': ['error', 'consecutive'],
    'no-var': 'error',
    'prefer-const': 'off',
    'no-param-reassign': ['error'],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
};
