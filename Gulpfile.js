var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    jekyll = require('gulp-jekyll'),
    spawn = require('child_process').spawn;

/**
 * Wait for jekyll-build, then launch the server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
  browserSync({
    server: {
      baseDir: '_site'
    }
  });
});

/**
 * Compress custom SASS to CSS and create source maps.
 */
gulp.task('sass', function () {
  return gulp.src('./assets/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      noCache: true,
      outputStyle: "compressed",
      lineNumbers: false,
      loadPath: './assets/css/*',
      sourceMap: true
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./assets/css'));
});

/**
 * Uglify task. Compress JS and create source maps.
 */
gulp.task('compress', function() {
  return gulp.src('./assets/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./js'));
});

/**
 * Jekyll build task, also triggers a browser reload.
 */
gulp.task('jekyll-build', ['sass', 'compress'], function () {
  var jekyll = spawn('jekyll', ['build']);

  jekyll.on('exit', function (code) {
    browserSync.reload();
    console.log('---------- Static site rebuilt ----------');
  })
});

/**
 * Watcher keeps an eye on SCSS/JS/MD/HTML changes for rebuilding - _site directory is ignored.
 */
gulp.task('watch', function() {
  gulp.watch(['./assets/**', './assets/*/**', './**/*.md', './**/*.html', '!./assets/maps', '!./_site/**', '!./_site/*/**'], ['sass', 'compress', 'jekyll-build']);
});

/**
 * Default task. Instantiate browser-sync and watcher.
 */
gulp.task('default', ['browser-sync', 'watch']);
