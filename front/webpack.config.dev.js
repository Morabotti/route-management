const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { resolveTsconfigPathsToAlias, mapEnvironmentVariables } = require('./webpack.utils.js')

const directory = fs.realpathSync(process.cwd());
const resolve = (relativePath) => path.resolve(directory, relativePath);

module.exports = {
  devtool: 'eval-cheap-module-source-map',
  mode: 'development',
  entry: {
    'js': [
      require.resolve('react-hot-loader/patch'),
      resolve('src/index.tsx')
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      ...resolveTsconfigPathsToAlias(),
      'react-dom': '@hot-loader/react-dom'
    }
  },
  output: {
    pathinfo: true,
    filename: '[name]/bundle.js',
    path: resolve('build'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.[j|t]sx?$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel']
        }
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          'import-glob'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg|png)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|fi/),
    new webpack.DefinePlugin(mapEnvironmentVariables(['GOOGLE_MAPS_API_KEY'])),
    new HtmlWebpackPlugin({
      inject: true,
      template: resolve('./src/index.html'),
      chunks: ['js']
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'public'),
        to: path.resolve(__dirname, 'build'),
      }]
    })
  ],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080'
      }
    },
    port: 8082,
    host: '0.0.0.0',
    contentBase: resolve('./build'),
    hot: true,
    disableHostCheck: true,
    historyApiFallback: true
  }
};
