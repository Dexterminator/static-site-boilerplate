var gulp = require('gulp');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var minifyCSS = require('gulp-csso');
var browserSync = require('browser-sync');
var sourceMaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var reload = browserSync.reload;

var views = 'views/**/*.pug';
var styles = 'styles/*.styl';
var javaScripts = 'js/*.js';

var buildDest = 'public';
var html = '*.html';
var css = 'css/*.css';
var bundle = 'js/bundle.min.js';

gulp.task('html', function () {
  return gulp.src([views, '!views/partials/*.pug'])
    .pipe(pug())
    .pipe(gulp.dest(buildDest))
});

gulp.task('css', function () {
  return gulp.src(styles)
    .pipe(stylus())
    .pipe(minifyCSS())
    .pipe(gulp.dest(buildDest + '/css'))
});

gulp.task('js', function () {
  return gulp.src(javaScripts)
    .pipe(sourceMaps.init())
    .pipe(concat('bundle.min.js'))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest(buildDest + '/js'))
});

gulp.task('watch', function () {
  browserSync({
    server: {
      baseDir: buildDest
    }
  });

  gulp.watch([html, css, bundle], {cwd: buildDest}, reload);
  gulp.watch(views, ['html']);
  gulp.watch(styles, ['css']);
  gulp.watch(javaScripts, ['js']);
});

gulp.task('default', ['html', 'css', 'js']);
