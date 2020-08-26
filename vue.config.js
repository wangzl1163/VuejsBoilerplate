const path = require('path')
const Terser = require('terser-webpack-plugin')
const webpack = require('webpack')
const randomKey = require('./src/Utils/RandomKey')
const AddAssetHtml = require('add-asset-html-webpack-plugin')

// 解析路径
const resolve = function (dir) {
   return path.join(__dirname, dir)
}

const isProduction = process.env.NODE_ENV === 'production'
// 采用webpack的DllPlugin抽离第三方依赖包，使编译时不再打包，减少构建时间
const dllConfig = require('./webpack.dll.config')
const DllReferences = Object.keys(dllConfig.entry).map(key => {
   return new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(resolve(`./public/dll/${key}.manifest.json`))
   })
})
const port = process.env.port || process.env.npm_config_port || 8080 // 端口
const publicPath = isProduction ? '/' : '/'

module.exports = {
   // 部署生产环境和开发环境下的URL。
   // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 https://www.baidu.com/。
   // 如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.baidu.com/admin/，则设置 baseUrl 为 /admin/。
   publicPath: publicPath,
   // 在npm run build 或 yarn build 时 ，生成文件的目录名称（默认dist）
   outputDir: 'dist',
   // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
   productionSourceMap: false,
   lintOnSave: true,
   // webpack-dev-server 相关配置，根据需要进行修改
   devServer: {
      host: '0.0.0.0',
      port: port,
      open: false,
      proxy: {
         // detail: https://cli.vuejs.org/config/#devserver-proxy
         [process.env.VUE_APP_BASE_API]: {
            target: `http://localhost:8080`,
            changeOrigin: true,
            pathRewrite: {
               ['^' + process.env.VUE_APP_BASE_API]: ''
            }
         }
      },
      disableHostCheck: true
   },
   configureWebpack: config => {
      const globalPlugins = [
         new webpack.DefinePlugin({ // 指定环境变量
            'process.env.AESKEY': JSON.stringify(randomKey.getKey(64)),
            'process.env.AESIV': JSON.stringify(randomKey.getKey(32))
         })
      ]

      if (isProduction) {
         config.optimization.splitChunks.cacheGroups = {
            ...config.optimization.splitChunks.cacheGroups,
            commonAsync: { // 按需（异步）加载的公共模块
               name: 'chunk-common-async',
               minChunks: 2,
               priority: -10,
               chunks: 'async',
               reuseExistingChunk: true
            }
         }

         config.plugins = config.plugins.concat([
            ...globalPlugins,
            ...DllReferences,
            new Terser({
               terserOptions: {
                  compress: {
                     ecma: 5,
                     warnings: false,
                     drop_console: true,
                     drop_debugger: true
                  }
               }
            }),
            new AddAssetHtml({
               filepath: path.resolve(__dirname, './public/dll/*.dll.js'),
               outputPath: 'dll', // 不配置会把dll包输出到dist目录
               publicPath: publicPath + 'dll' // 如果publicPath进行了自定义，需要设置
            }),
            new webpack.optimize.LimitChunkCountPlugin({
               maxChunks: 20,
               minChunkSize: 1024
            })
         ])
      } else {
         config.plugins = config.plugins.concat([...globalPlugins])
      }
   },
   chainWebpack (config) {
      // set svg-sprite-loader
      config.module
         .rule('svg')
         .exclude.add(resolve('src/Assets/Icons'))
         .end()
      config.module
         .rule('icons')
         .test(/\.svg$/)
         .include.add(resolve('src/Assets/Icons'))
         .end()
         .use('svg-sprite-loader')
         .loader('svg-sprite-loader')
         .options({
            symbolId: 'icon-[name]'
         })
         .end()
   }
}
