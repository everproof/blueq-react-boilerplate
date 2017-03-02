import { resolve } from 'path'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'

import config from './config'

const LAUNCH_COMMAND = config.env.npm_lifecycle_event
const isProduction = LAUNCH_COMMAND === 'production'

const PATHS = {
  app: resolve(__dirname, 'app'),
  build: resolve(__dirname, 'dist'),
}

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  filename: 'index.html',
  inject: 'body',
  template: `${PATHS.app}/index.html`,
})

const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
})

const base = {
  context: PATHS.app,
  module: {
    rules: [
      {
        test: /\.css$/,
        include: /sanitize.css/,
        use: ['style-loader?sourceMap', 'css-loader?sourceMap'],
      },
      {
        test: /\.scss$/,
        include: /app/,
        exclude: /\/styles\/_{1}.*/,
        use: [
          'style-loader?sourceMap',
          'css-loader?sourceMap'
            + '&camelCase=dashes'
            + '&modules'
            + '&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader?sourceMap',
          'sass-loader?sourceMap',
        ],
      },
      {
        test: /\.jsx?$/,
        include: [/app/, /react-icons\/io/],
        use: ['babel-loader'],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: PATHS.build,
    publicPath: '/',
  },
  resolve: {
    enforceExtension: false,
    extensions: ['.js', '.jsx', '.css', '.scss'],
    modules: [resolve('./app'), 'node_modules'],
  },
}

const developmentConfig = {
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    contentBase: PATHS.build,
    hot: true,
    inline: true,
    publicPath: '/',
  },
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    './index.jsx',
  ],
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
}

const productionConfig = {
  devtool: 'cheap-module-source-map',
  entry: ['./index.jsx'],
  plugins: [HtmlWebpackPluginConfig, productionPlugin],
}

const extraConfig = isProduction ? productionConfig : developmentConfig

export default {
  ...base,
  ...extraConfig,
}
