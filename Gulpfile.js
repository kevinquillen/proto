var gulp = require('gulp');
    path = require('path'),
    gutil = require('gulp-util');
    sass = require('gulp-sass');
    watch = require('gulp-watch');
    browserSync = require('browser-sync');
    sourcemaps = require('gulp-sourcemaps');
    uglify = require('gulp-uglify');
    htmlmin = require('gulp-htmlmin'),

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
    .pipe(gulp.dest('./css'))
    .pipe(notify({
      title: "SASS Compiled",
      message: "All SASS files have been recompiled to CSS.",
      onLast: true
    }));
});

gulp.task('compress', function() {
  return gulp.src('./js/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./js'))
    .pipe(notify({
      title: "JS Minified",
      message: "All JS files in the theme have been minified.",
      onLast: true
    }));
});

gulp.task('html', ['jekyll'], function() {
  return gulp.src([path.join(deploy, '*.html'),path.join(deploy, '*/*/*/*.html')])
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(deploy))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('watch', function() {
  browserSync({
    proxy: "http://localhost:3000"
  });

  // watch scss, js, and tpl files and clear drupal theme cache on change, reload browsers
  gulp.watch(['./scss/**/*.scss', './js/**/*.js', './templates/**/*.html.twig'], function() {
    gulp.run('sass');
    gulp.run('compress');
  }).on("change", browserSync.reload);
});

gulp.task('default', ['watch']);
