'use strict'
import gulp from 'gulp' // import gulp.
// Utility Package.
import gutil from 'gulp-util' // gulp-util plugin.
import changed from 'gulp-changed' // only change file watch plugin.
import plumber from 'gulp-plumber' // if error task. don't stop watch plugin.
import rename from 'gulp-rename' // File Rename PlugIn.
import del from 'del' // File Delete PlugIn.
// For Webpack.
import webpack from 'webpack' // webpack.
import webpackStream from 'webpack-stream' // Using webpack for gulp Plugin.
import webpackGulp from './webpack/webpack.gulp.babel' // webpack base config file.
// For JS.
import jsmin from 'gulp-uglify' // JS File Compression.
import ejs from 'gulp-ejs' // gulp ejs.
// For Sass & CSS.
import sass from 'gulp-sass' // sass file compile.
import sassGlob from 'gulp-sass-glob' // sass glob.
import postCSS from 'gulp-postcss' // postCSS.
import autoprefixer from 'autoprefixer' // add vendor prefix in CSS automatically.
import flexbug from 'postcss-flexbugs-fixes' // for flexbox bug.
import cssComb from 'gulp-csscomb' // code formatting for CSS.
import cssmin from 'gulp-cssmin' // CSS File Compression.
import sourcemaps from 'gulp-sourcemaps' // write sourcemaps.
// For HTML.
import prettify from 'gulp-prettify' // code formatting for HTML.
// For Images.
import imageMin from 'gulp-imagemin' // images compression.
import pngImageMin from 'imagemin-pngquant' // png images compression.
import svgMin from 'gulp-svgmin' // svg compression.
// For FTP.
import ftp from 'vinyl-ftp' // ftp plugin.
import sftp from 'gulp-sftp' // sftp plugin.
// For BrowserSync.
import browserSync from 'browser-sync' // browserSync.
// Setting.
const autoprefixerSet = [
  // setting of autoprefixer.
  'last 2 version',
  'ie >= 10',
  'iOS >= 8',
  'Android >= 4.4'
]
const postCSSPlugIn = [autoprefixer({
  browsers: autoprefixerSet
}), flexbug] // PostCSS plugin.
const addIMGDir = 'addImages/*' // added image fold,
const distIMGDir = 'images/*' // compression image fold,
const upLoadFile = [
  // upload file.
  '**/*.html',
  '!node_modules/**/*.html',
  '!material-uhuru/**/*.html',
  '!evacuate/**/*.html',
  'css/**/*.css',
  'js/**/*.js',
  'img/*'
]

// webpack.
gulp.task('webpack', () => {
  return webpackStream(webpackGulp, webpack)
    .on('error', function () {
      this.emit('end')
      console.log('error')
    })
    .pipe(gulp.dest('js/'))
})

// JS File Compression.
gulp.task('jsmin', () => {
  return gulp
    .src('js/*.js')
    .pipe(
      jsmin()
    )
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(gulp.dest('js/'))
})

// sass compile & use PostCSS plugIn.
gulp.task('sass', () => {
  return gulp
    .src('sass/**/*.scss')
    .pipe(
      plumber({
        errorHander: error => {
          console.log(error.message)
        }
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(
      sass({
        outputStyle: 'expanded'
      })
    )
    .pipe(postCSS(postCSSPlugIn))
    .pipe(sourcemaps.write('../maps'))
    .pipe(cssComb())
    .pipe(gulp.dest('css/'))
})

// CSS File Compression.
gulp.task('cssmin', () => {
  return gulp
    .src('css/**/*.css')
    .pipe(cssmin())
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(gulp.dest('css/'))
})

// EJS Compile & Code Formatting for HTML.
gulp.task('ejs', (done) => {
  return gulp
    .src(['ejs/**/*.ejs', '!ejs/**/_*.ejs'])
    .pipe(ejs({}, {}, { ext: '.html' }))
    .pipe(gulp.dest('.'))
    .on('end', () => {
      gulp.src('**/*.html', '!node_modules/**/*.html')
      .pipe(
        prettify({
          indent_size: 2,
          indent_char: ' ',
          end_with_newline: false,
          preserve_newlines: false,
          unformatted: ['span', 'a', 'img']
        })
      )
      .pipe(gulp.dest('.'))
      .on('end', done)
    })
})

// compression images.
gulp.task('imgMin', () => {
  return gulp
    .src(`${addIMGDir}(.jpg|.jpeg|.png|.gif)`)
    .pipe(plumber())
    .pipe(changed(addIMGDir))
    .pipe(
      imageMin({
        use: [
          pngImageMin({
            quality: '60-80',
            speed: 4
          })
        ]
      })
    )
    .pipe(gulp.dest(distIMGDir))
})

// svg file compression.
gulp.task('svgMin', () => {
  return gulp
    .src(`${addIMGDir}.svg`)
    .pipe(plumber())
    .pipe(changed(addIMGDir))
    .pipe(svgMin())
    .pipe(gulp.dest(distIMGDir))
})

// File Rename Task.
gulp.task('rename', () => {
  return gulp
    .src('index.html')
    .pipe(
      rename({
        extname: '.php'
      })
    )
    .pipe(gulp.dest('.'))
})

// File Delete Task.
gulp.task('delete', cb => {
  return del(['**/.DS_Store', '**/*.ejs',  '!ejs/**/*', '!node_modules/**/*'], cb)
})

// local browser connect & sync.
gulp.task('browserSync', () => {
  return browserSync({
    browser: 'google chrome',
    open: 'external',
    notify: false,
    /* if setting proxy.
    proxy: 'test.dev or localhost:8080'
    */
    // setting root.
    server: {
      baseDir: '.',
      index: 'index.html'
    }
  })
})

// file save's local browser reload.
gulp.task('localBrowserReload', () => {
  return browserSync.reload()
})

// ftp upload.
gulp.task('ftpUpLoad', () => {
  const ftpConnect = ftp.create({
    host: '***',
    user: '***',
    password: '***',
    parallel: 7,
    log: gutil.log
  })
  return gulp
    .src(upLoadFile, {
      base: '.',
      buffer: false
    })
    .pipe(ftpConnect.newer('/'))
    .pipe(ftpConnect.dest('/'))
})

// gulp default task, terminal command 'gulp'.
gulp.task('default', gulp.parallel( 'browserSync', () => {
  // first task, local server connect & local browser sync.
  // ↓Select a task according to the project. プロジェクトで使用するタスクを選択しましょう。↓
  gulp.watch('base/**/*', gulp.task('webpack')) // JS File webpack.
  gulp.watch('js/core.js', gulp.task('jsmin')) // watching change's JS flie, File Compression.
  // gulp.watch('sass/**/*.scss', gulp.task('sass')) // watching sass file save's auto compile & add vendor prefix automatically.
  // gulp.watch('css/**/*.css', gulp.task('cssmin')) // watching change's CSS flie, File Compression.
  // gulp.watch('ejs/**/*', gulp.task('ejs')) // watch ejs.
  // gulp.watch(addIMGDir, gulp.parallel('imgMin', 'svgMin')) // watching Img Dir compression.
  // gulp.watch(['**/*.ejs',  '!ejs/**/*'], gulp.task('delete')) // watching Delete Task.
  // gulp.watch('**/*', gulp.task('rename')) // watching Rename Task.
  // gulp.watch(upLoadFile, gulp.task('ftpUpLoad')) // watching file save's auto ftp upload.
  let timeID // watching file save's local browser reload & adjusted reload start time.
  gulp.watch(upLoadFile).on('change',() => {
    clearTimeout(timeID)
      timeID = setTimeout(() => {
        browserSync.reload()
      }, 1000)
    })
}))
