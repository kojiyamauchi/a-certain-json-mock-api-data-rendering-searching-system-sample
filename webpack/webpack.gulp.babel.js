/*
   Setting webpack for gulp.
*/

// Import webpack.
import webpack from 'webpack'
// Import Node.js 'path' Modules. Using for Setting of Root Dir.
import path from 'path'
// Import 'glob' Modules.
import glob from 'glob'
// Setting Multiple Entry Points for Static Website.
const baseDir = './base/'
const entries = {}
glob.sync('*.js', { cwd: baseDir }).map(info => entries[info] = baseDir + info)

// Setting Start.
module.exports = {
  // Setting webpack Mode.
  mode: 'development',

  // When Using Gulp, Development Mode is Disabled?
  // Just to be Sure, Setting the Cache.
  cache: true,

  // JS Core File Entry Point.
  entry: entries,

  // JS Core File Dist Point.
  output: {
    path: `${__dirname}/js/`,
    filename: '[name]'
  },

  // Core Settings is Below.
  // Setting Rules According to JS Library and Framework.
  module: {
    rules: [
      // ES Lint.
      {
        enforce: 'pre',
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      // ES Lint End.
      // ES2015.
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory'
      },
      // ES2015 End.
      // TypeScript.
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      // TypeScript End.
      // Import Json File.
      {
        type: 'javascript/auto',
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader'
      },
      // Import Json File End.

      // JS Sorce Map.
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader'
      }
      // JS Sorce Map End.
    ]
  },
  // Setting Rules According to JS Library and Framework End.

  // Setting for Import JS Modules.
  resolve: {
    // Setting for Cut the File Extension When Import JS Module.
    extensions: ['.js', 'ts', '.json'],

    // Setting for Project Root Dir, When Import JS Modules.
    alias: {
      '@': path.resolve(__dirname, './..')
    }
  },
  // Setting for Import JS Modules End.

  // Setting for Plugins.
  plugins: [],
  // Setting for Plugins End.

  // Setting for Warning on Terminal.
  performance: {
    /* An entrypoint represents all assets that would be utilized during initial load time for a specific entry.
    This option controls when webpack should emit performance hints based on the maximum entrypoint size.
    The default value is 250000 (bytes). */
    maxEntrypointSize: 400000,

    /* An asset is any emitted file from webpack.
    This option controls when webpack emits a performance hint based on individual asset size.
    The default value is 250000 (bytes). */
    maxAssetSize: 400000
  }
}
