const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const publicPath = `${process.env.PUBLIC_PATH}/`

module.exports = {
  entry: {
    main: {
      filename: 'main.[contenthash].js',
      import: './src/index.ts',
    }
  },
  output: {
    filename:'static/scripts/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath,
    clean: true,
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new CssMinimizerPlugin(),
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
  ]
};