module.exports = {
  presets: [
    [
      '@vue/app',
      {
        // useBuiltIns: 'entry',
      }
    ]
  ],
  plugins: [
    'lodash',
    '@babel/plugin-syntax-dynamic-import'
    // [
    //   'import',
    //   {
    //     libraryName: 'vant',
    //     libraryDirectory: 'es',
    //     // 指定样式路径
    //     style: name => `${name}/style/less`
    //   },
    //   'vant'
    // ]
  ]
};
