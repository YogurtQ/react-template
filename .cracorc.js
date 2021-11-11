const path = require('path')
const webpack = require('webpack')
const CracoLess = require('craco-less')

module.exports = {
  devServer: {
    port: 8000,
    open: false
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
    plugins: [
      new webpack.ProvidePlugin({
        _: 'lodash',
        dayjs: 'dayjs',
        $utils: [path.resolve(__dirname, 'src/utils'), 'default'], // 非工具库的自定义全局变量统一在前面加上$
        $http: [path.resolve(__dirname, 'src/libs/http.js'), 'default'],
      })
    ]
  },
  plugins: [
    {
      plugin: CracoLess,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            patterns: path.resolve(__dirname, 'src/styles/variables.less'),
            javascriptEnabled: true
          }
        }
      }
    }
  ]
}
