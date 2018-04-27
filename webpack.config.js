/* eslint no-use-before-define: 0 */
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const CssoWebpackPlugin = require('csso-webpack-plugin').default
/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event
var isTest = ENV === 'test' || ENV === 'test-watch'
var isProd = ENV === 'build'
var argParams = {};
process.argv.forEach((value) => {
  if (value.split('=')[1]) {
    argParams[value.split('=')[0].replace('--','')] = value.split('=')[1];
  }
})
var host = argParams.host || 'localhost';

module.exports = (function makeWebpackConfig() {
  /**
     * Config
     * Reference: http://webpack.github.io/docs/configuration.html
     * This is the object where all configuration gets set
     */
  var config = {}

  /**
     * Entry
     * Reference: http://webpack.github.io/docs/configuration.html#entry
     * Should be an empty object if it's generating a test build
     * Karma will set this when it's a test build
     */
  config.entry = isTest
    ? void 0
    : {
      app: './src/app/index.js'
    }

  /**
     * Output
     * Reference: http://webpack.github.io/docs/configuration.html#output
     * Should be an empty object if it's generating a test build
     * Karma will handle setting it up for you when it's a test build
     */
  config.output = isTest
    ? {}
    : {
      // Absolute output directory
      path: path.join(__dirname, '/dist'),

      // Output path from the view of the page
      // Uses webpack-dev-server in development
      publicPath: isProd
        ? '/'
        : `http://${host}:8080/`,

      // Filename for entry points
      // Only adds hash in build mode
      filename: isProd
        ? '[name].[hash].js'
        : '[name].bundle.js',

      // Filename for non-entry points
      // Only adds hash in build mode
      chunkFilename: isProd
        ? '[name].[hash].js'
        : '[name].bundle.js'
    }

  /**
     * Devtool
     * Reference: http://webpack.github.io/docs/configuration.html#devtool
     * Type of sourcemap to use per build type
     */
  if (!isProd) {
    config.devtool = 'inline-source-map'
  }

  config.node = {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    'crypto': 'empty'
  }
  /**
     * Loaders
     * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
     * List: http://webpack.github.io/docs/list-of-loaders.html
     * This handles most of the magic responsible for converting modules
     */
  // Initialize module
  config.module = {
    rules: [
      {
        // JS LOADER
        // Reference: https://github.com/babel/babel-loader
        // Transpile .js files using babel-loader
        // Compiles ES6 and ES7 into ES5 code
        test: /\.js$/,
        use: [
          'auto-ngtemplate-loader', 'babel-loader'
        ],
        exclude: /node_modules/
      }, {
        // CSS LOADER
        // Reference: https://github.com/webpack/css-loader
        // Allow loading css through js
        //
        // Reference: https://github.com/postcss/postcss-loader
        // Postprocess your css with PostCSS plugins
        test: /\.css$/,
        // Reference: https://github.com/webpack/extract-text-webpack-plugin
        // Extract css files in production builds
        //
        // Reference: https://github.com/webpack/style-loader
        // Use style-loader in development.

        loader: !isProd
          ? 'style-loader?sourceMap=true!css-loader?sourceMap=true'
          : 'style-loader!css-loader'

      }, {
        test: /\.(png|woff|woff2|eot|ttf|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }, {
        // NG TEMPLATE LOADER
        // https://github.com/yashdalfthegray/auto-ngtemplate-loader
        test: /\.tpl.html$/,
        exclude: `${path.join(__dirname, '/src/index.html')}`,
        loaders: [`ngtemplate-loader?relativeTo=${path.join(__dirname, '/src')}`]
      }, {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          minimize: true
        }
      }
    ]
  }

  // ISTANBUL LOADER
  // https://github.com/deepsweet/istanbul-instrumenter-loader
  // Instrument JS files with istanbul-lib-instrument for subsequent code coverage reporting
  // Skips node_modules and files that end with .spec.js
  if (isTest) {
    config.module.rules.push({
      enforce: 'pre',
      test: /\.js$/,
      exclude: [
        /node_modules/, /\.spec\.js$/
      ],
      loader: 'istanbul-instrumenter-loader',
      query: {
        esModules: true
      }
    })
  }

  /**
     * PostCSS
     * Reference: https://github.com/postcss/autoprefixer-core
     * Add vendor prefixes to your css
     */
  // NOTE: This is now handled in the `postcss.config.js`
  //       webpack2 has some issues, making the config file necessary

  /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
  config.plugins = [
    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/i,
      options: {
        postcss: {
          plugins: [autoprefixer]
        }
      }
    }),
    new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery'}),
  ]

  // Skip rendering index.html in test mode
  if (!isProd) {
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    // Render index.html
    config.plugins.push(new HtmlWebpackPlugin({template: './src/index.html', inject: 'body'}),

    // Reference: https://github.com/webpack/extract-text-webpack-plugin
    // Extract css files
    // Disabled when in test mode or not in build mode
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      disable: !isProd,
      allChunks: true
    }))
   } else {
    config.plugins.push(
    // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
    // Only emit files when there are no errors
    new webpack.NoEmitOnErrorsPlugin(), new HtmlWebpackPlugin({template: './src/index.html'}),

    // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    // Minify all javascript, switch loaders to minimizing mode
    new webpack.optimize.UglifyJsPlugin({ sourceMap: false, mangle: false }), new CssoWebpackPlugin(),

    // Copy assets from the public folder
    // Reference: https://github.com/kevlened/copy-webpack-plugin
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'src/public')
      }
    ]))
  }



  /**
     * Dev server configuration
     * Reference: http://webpack.github.io/docs/configuration.html#devserver
     * Reference: http://webpack.github.io/docs/webpack-dev-server.html
     */
  config.devServer = {
    contentBase: './src/',
    open: false,
    quiet: false,
    stats: {
      colors: true
    },
    hot: false,
    inline: true,
    watchOptions: {
      ignored: /node_modules/
    },
    host: host,
    watchContentBase: true,
  }

  return config
})()
