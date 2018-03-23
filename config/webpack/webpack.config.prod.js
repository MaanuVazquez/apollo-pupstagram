'use strict'
var precss = require('precss')
var autoprefixer = require('autoprefixer')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
var paths = require('./paths')
var getClientEnvironment = require('./env')
var publicPath = '/'
var publicUrl = publicPath.slice(0, -1)
var env = getClientEnvironment(publicUrl)

if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.')
}

const cssFilename = 'static/css/[name].[contenthash:8].css'

function buildEntryConfig () {
  return [
    // 'babel-polyfill',
    paths.appIndexJs
  ]
}

function buildOutputConfig () {
  return {
    path: paths.appBuild,
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
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
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.DefinePlugin(env.stringified),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new ExtractTextPlugin(cssFilename),

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
        exclude: /node_modules/,
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:[
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
        })
      },
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)(\?.*)?$/,
          /\.css$/,
          /\.json$/,
          /\.svg$/,
          /\.(graphql|gql)$/
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
    bail: true,
    devtool: 'source-map',
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
