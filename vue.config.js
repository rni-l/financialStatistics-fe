const path = require('path'),
  UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
  LodashModuleReplacementPlugin = require('lodash-webpack-plugin'),
  privateConfig = require('./private-config')

function resolve(dir) {
  return path.join(__dirname, dir);
}

const isDev = process.env.VUE_APP_MODE === 'develop',
  isPro = process.env.VUE_APP_MODE === 'production';

module.exports = {
  // eslint-loader 是否在保存的时候检查
  publicPath: './',
  outputDir: '../build/calculatorApp',
  lintOnSave: false,
  productionSourceMap: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@api', resolve('src/api'))
      .set('@views', resolve('src/views'))
      .set('@style', resolve('src/style'))
      .set('@utils', resolve('src/utils'));
    // config.performance
    //   .hints(false)
    //   .maxEntrypointSize(10000000000)
    //   .maxAssetSize(10000000000);
    // const entry = config.entry('app');
    /**
     * 删除懒加载模块的 prefetch preload，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
     * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
     */
    // entry.add('babel-polyfill').end()
    config.plugins.delete('prefetch').delete('preload');
    if (process.env.npm_config_report) {
      config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    }
  },
  configureWebpack: {
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            // warnings: isDev ? 'verbose' : false,
            // inline: 1,
            // keep_fnames: true,
            drop_console: isPro, // console
            drop_debugger: false,
            pure_funcs: isDev ? [] : ['console.log'] // 移除console
          }
        })
      ]
    },
    plugins: [new LodashModuleReplacementPlugin()]
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "./src/styles/base.scss";`
      }
    }
  },
  devServer: {
    port: 4445,
    open: true, // 配置自动启动浏览器
    // 配置代理(跨域)
    proxy: {
      '/api': {
        target: privateConfig.target,
        ws: true
      }
    }
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  },
  transpileDependencies: []
};
