var gulp = require('gulp');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var minifyCSS = require('gulp-csso');
var sourceMaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var log = require('gulplog');
var browserSync = require('browser-sync');
var rename = require('gulp-rename');
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
  var b = browserify({
    entries: 'js/main.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('js/main.js'))
    .pipe(buffer())
    .pipe(sourceMaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(rename('bundle.min.js'))
    .on('error', log.error)
    .pipe(sourceMaps.write('./'))
    .pipe(gulp.dest(buildDest + '/js'));
});

gulp.task('watch', function () {
  browserSync({
    server: {
      baseDir: buildDest,
      serveStaticOptions: {
        extensions: ['html']
      }
    }
  });

  gulp.watch([html, css, bundle], {cwd: buildDest}, reload);
  gulp.watch(views, ['html']);
  gulp.watch(styles, ['css']);
  gulp.watch(javaScripts, ['js']);
});

gulp.task('default', ['html', 'css', 'js']);
