const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  productionSourceMap: false,
  lintOnSave: true,
  devServer: {
    https: true,
    port: 9000,
    allowedHosts: 'all',
    open: false,
    hot: true,
    historyApiFallback: true, // ​​historyApiFallback​选项会告诉 ​webpack-dev-server​在所有404的路由请求上返回index.html文件，这样Vue Router就可以接管并处理这些请求了。
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  chainWebpack: (config) => {
    // 优化打包
    config.optimization.splitChunks({
      minSize: 0,
      chunks: 'all'
    })
  },
  configureWebpack: {
    resolve: {
      extensions: ['*', '.js', '.vue', '.json'],
      alias: {
        '@': resolve('src'),
        '@imgs': resolve('src/assets/imgs'),
        '@css': resolve('src/assets/css'),
        '@static': resolve('src/public')
      }
    },
    devtool:
      process.env.NODE_ENV === 'development' ? 'eval-source-map' : 'inline-nosources-source-map',
    optimization: {
      splitChunks: {
        automaticNameDelimiter: '-' // 配置打包后 chunkName 连接符
      }
    },
    output: {
      filename:
        process.env.NODE_ENV === 'development' ? '[name].[hash:8].js' : '[name].[chunkhash:8].js'
    },
    plugins: []
  },
  // rem 的配置
  css: {}
}
