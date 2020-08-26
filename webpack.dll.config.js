const webpack = require('webpack')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
   mode: 'production',
   entry: {
      vue: ['vue', 'vue-router', 'vuex', 'vuex-persistedstate'],
      element: ['element-ui']
   },
   output: {
      path: path.join(__dirname, './public/dll'),
      filename: '[name].[hash:8].dll.js',
      library: '[name]_library',
      libraryTarget: 'global'
   },
   plugins: [
      new CleanWebpackPlugin(),
      new webpack.DllPlugin({
         context: __dirname,
         path: path.join(__dirname, './public/dll/[name].manifest.json'),
         name: '[name]_library'
      })
   ]
}
