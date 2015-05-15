var gulp = require('gulp'),
    path = require('path'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    jekyll = require('gulp-jekyll'),
    spawn = require('child_process').spawn;

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
  browserSync({
    server: {
      baseDir: '_site'
    }
  });
});

gulp.task('sass', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      noCache: true,
      outputStyle: "compressed",
      lineNumbers: false,
      loadPath: './css/*',
      sourceMap: true
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./css'));
});

gulp.task('compress', function() {
  return gulp.src('./js/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./js'));
});

gulp.task('jekyll-serve', function () {
  var jekyll = spawn('jekyll', ['serve']);

  jekyll.on('exit', function (code) {
    console.log('---------- Serving static site on 127.0.0.1:4000 ----------')
  })
});

gulp.task('jekyll-build', function () {
  var jekyll = spawn('jekyll', ['build']);

  jekyll.on('exit', function (code) {
    browserSync.reload();
    console.log('---------- Static site rebuilt ----------');
  })
});

gulp.task('watch', function() {
  gulp.watch(['./scss/**/*.scss', './js/**/*.js', './**/*.md', './**/*.html', '!./_site/**', '!./_site/*/**'], ['sass', 'compress', 'jekyll-build']);
});

gulp.task('default', ['jekyll-serve', 'browser-sync', 'watch']);
