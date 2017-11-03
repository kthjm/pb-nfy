import { resolve } from 'path'

const nodeModulesPath = resolve('node_modules')

export default {
  context: process.cwd(),
  entry: {
    mobile: [resolve(`mobile/index.js`)],
    desktop: [resolve(`desktop/index.js`)]
  },
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [nodeModulesPath],
        use: [`babel-loader?cacheDirectory`]
      }
    ]
  }
}
