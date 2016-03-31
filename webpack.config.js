
var webpack = require('webpack');
var helpers = require('./helpers');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

var ENV = process.env.ENV = process.env.NODE_ENV = 'development';
var HMR = helpers.hasProcessFlag('hot');

var metadata = {
  title: 'KO SPA Test 1',
  baseUrl: '/',
  host: 'localhost',
  port: 8080,
  ENV: ENV,
  HMR: HMR
};
/*
 * Config
 * with default values at webpack.default.conf
 */
module.exports = {
  // static data for index.html
  metadata: metadata,  
  // cache: true,
  debug: true,
//   devtool: 'source-map',
  devtool: 'eval', // for faster builds use 'eval'

  // our angular app
  entry: {
    'libs': './src/libs.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['', '.ts', '.js']
  },

  // Config for our build files
  output: {
    path: helpers.root('dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  module: {
    preLoaders: [
      // { test: /\.ts$/, loader: 'tslint-loader', exclude: [ helpers.root('node_modules') ] },
      { test: /\.js$/, loader: "source-map-loader", exclude: [ helpers.root('node_modules/rxjs') ] }
    ],
    loaders: [
      // Support for .ts files.
      { test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: [ /\.(spec|e2e)\.ts$/ ] },

      // Support for *.json files.
      { test: /\.json$/,  loader: 'json-loader' },

      // Support for CSS as raw text
      { test: /\.css$/,   loader: 'style-loader!css-loader' },

      // support for .html as raw text
      { test: /\.html$/,  loader: 'raw-loader', exclude: [ helpers.root('src/index.html') ] },
      
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}

    ]
  },

  plugins: [
    new ForkCheckerPlugin(),
    new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({ name: ['app', 'libs'], minChunks: Infinity }),
    // new UglifyJsPlugin({
    //      beautify: false
    // }),
    // static assets
    new CopyWebpackPlugin([ { from: 'src/assets', to: 'assets' } ]),
    // generating html
    new HtmlWebpackPlugin({ template: 'src/index.html', chunksSortMode: 'none' }),
    // Environment helpers (when adding more properties make sure you include them in custom-typings.d.ts)
    new webpack.DefinePlugin({
      'ENV': JSON.stringify(metadata.ENV),
      'HMR': HMR
    })
  ],

  // Other module loader config

  // our Webpack Development Server config
  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src',
  },
  devServer: {
    port: metadata.port,
    host: metadata.host,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },
  node: {
    global: 'window',
    process: true,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};

