'use strict'
var precss = require('precss')
var autoprefixer = require('autoprefixer')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
var WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
var getClientEnvironment = require('./env')
var paths = require('./paths')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin')

var publicPath = '/'
var publicUrl = ''
var env = getClientEnvironment(publicUrl)

function buildEntryConfig () {
  return [
    'react-hot-loader/patch',
    'babel-polyfill',
    paths.appIndexJs
  ]
}

function buildOutputConfig () {
  return {
    path: paths.appBuild,
    pathinfo: true,
    filename: 'static/js/bundle.js',
    publicPath: publicPath
  }
}

function buildResolveConfig () {
  return {
    modules: [
      paths.appSrc,
      paths.nodeModules
    ],
    extensions: ['.js', '.jsx']
  }
}

function buildPluginsConfig () {
  return [
    new InterpolateHtmlPlugin(env.raw),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml
    }),
    new FlowBabelWebpackPlugin(),
    new webpack.DefinePlugin(env.stringified),
    new webpack.NamedModulesPlugin(),
    new CaseSensitivePathsPlugin(),
    new ExtractTextPlugin('static/css/[name].css'),
    new WatchMissingNodeModulesPlugin(paths.nodeModules)
  ]
}

function buildModuleConf () {
  return {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: paths.appSrc
      },
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: 'babel-loader',
        exclude: paths.nodeModules
      },
      {
        test: /\.(graphql|gql)$/,
        include: paths.appSrc,
        exclude: paths.nodeModules,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              svgo: {
                plugins: [{removeTitle: false}],
                floatPrecision: 2
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader',
            options: {
              root: paths.appSrc,
              localIdentName: '[name]__[local]--[hash:base64:5]',
              importLoaders: 1,
              modules: true
            }
          },
          {loader: 'postcss-loader', options: {plugins: [precss, autoprefixer], ident: 'postcss'}}
        ]
      },
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)(\?.*)?$/,
          /\.css$/,
          /\.json$/,
          /\.svg$/,
          /\.(graphql|gql)/,
        ],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  }
}

function webpackConfig () {
  try {
    var entry = buildEntryConfig()
    var output = buildOutputConfig()
    var resolve = buildResolveConfig()
    var module = buildModuleConf()
    var plugins = buildPluginsConfig()
  } catch (e) {
    console.log(e)
  }

  return {
    devtool: 'cheap-module-source-map',
    entry: entry,
    output: output,
    resolve: resolve,
    module: module,
    plugins: plugins,
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }
  }
}

module.exports = webpackConfig()

