const { override, fixBabelImports, addWebpackPlugin, addLessLoader, addWebpackAlias, overrideDevServer } = require('customize-cra');
const webpack = require('webpack');
const path = require('path');

const proxy = process.env.DEV_SERVER_PROXY_URL || 'http://localhost:8881';
const port = process.env.DEV_SERVER_PORT || 8880;

module.exports = {
  webpack: override(
    fixBabelImports('import', {
      //配置按需加载
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src'),
    }),
    addLessLoader({
      javascriptEnabled: true,
    }),
    addWebpackPlugin(
      new webpack.ProvidePlugin({
        $http: [path.resolve(__dirname, 'src/libs/http.js'), 'default'],
        $utils: [path.resolve(__dirname, 'src/utils/index.js'), 'default'],
      })
    ),
    (config) => {
      const loaders = config.module.rules.find((rule) => Array.isArray(rule.oneOf)).oneOf;
      const lessLoader = loaders.find((loader) => loader.test.toString().includes('.less'));
      lessLoader.use.push({
        loader: 'style-resources-loader',
        options: {
          patterns: path.resolve(__dirname, 'src/styles/variables.less'),
        },
      });
      return config;
    }
  ),
  devServer: overrideDevServer((config) => ({
    ...config,
    port,
    proxy: {
      '/api': proxy,
    },
  })),
};
