const { ContextReplacementPlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { resolveTsconfigPathsToAlias } = require('./webpack.utils.js')
const path = require('path');

module.exports = {
  mode: 'production',
  entry: ['./src/index.tsx'],
  resolve: {
    alias: resolveTsconfigPathsToAlias(),
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  output: {
    filename: '[name].bundle.[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    clean: true
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.[j|t]sx?$/,
        loader: 'babel-loader',
        options: {
          compact: true
        }
      }, {
        test: /\.(woff|woff2|eot|ttf|otf|svg|png)$/,
        loader: 'file-loader'
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          'import-glob'
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial'
        }
      }
    }
  },
  plugins: [
    new ContextReplacementPlugin(/moment[/\\]locale$/, /en|fi/),
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.[hash].css'
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'public'),
        to: path.resolve(__dirname, 'build')
      }]
    })
  ]
};
