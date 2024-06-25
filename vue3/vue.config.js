const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir) //path.join(__dirname)设置绝对路径
}

module.exports = {
  // 基本路径
  publicPath: 'https://testmicro.oa.fenqfenle.com/',
  // 输出文件目录
  outputDir: 'dist',
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV === 'development',
  devServer: {
    https: true,
    port: 9010,
    allowedHosts: 'all',
    open: false,
    historyApiFallback: true, // ​​historyApiFallback​选项会告诉 ​webpack-dev-server​在所有404的路由请求上返回index.html文件，这样Vue Router就可以接管并处理这些请求了。
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  configureWebpack: {
    output: {
      library: 'vue3',
      libraryTarget: 'umd',
      filename:
        'development' === process.env.NODE_ENV ? '[name].[hash:8].js' : '[name].[chunkhash:8].js'
    },
    optimization: {
      splitChunks: {
        automaticNameDelimiter: '-' // 配置打包后 chunkName 连接符
      }
    },
    devtool:
      process.env.NODE_ENV === 'development' ? 'eval-source-map' : 'inline-nosources-source-map',
    plugins: [],
    resolve: {
      extensions: ['*', '.js', '.vue', '.json'],
      alias: {
        '@': resolve('src'),
        '@imgs': resolve('src/assets/imgs'),
        '@css': resolve('src/assets/css'),
        '@static': resolve('src/public')
      }
    }
  },
  chainWebpack: (config) => {},
  // rem 的配置
  css: {}
}
