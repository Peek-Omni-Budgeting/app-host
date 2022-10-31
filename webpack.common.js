const path = require('path');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const remotes = require('./remotes.config');
const deps = require('./package.json').dependencies;

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

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {transpileOnly: true},
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ]
          }
        }
      }, 
      {
        test: /\.(c|sc)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: 'asset/resourse',
        generator: {
          filename: 'static/images/[contenthash][ext][query]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[contenthash][ext]',
        },
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      }
    ]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'app-host',
      filename: 'remoteEntry.js',
      remotes: {...remotes},
      exposes: {},
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: deps['react-router-dom'],
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new AddAssetHtmlPlugin([
      {
        filepath: path.resolve(__dirname, './public/styles.css'),
        hash: true,
        typeOfAsset: 'css',
      },
    ]),
    new ForkTsCheckerPlugin(),
    new Dotenv(),
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    alias: {
      '@Utils': path.resolve(__dirname, 'src/utils/'),
      '@Components': path.resolve(__dirname, 'src/components/'),
    }
  }
};