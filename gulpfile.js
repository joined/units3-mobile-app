var gulp = require('gulp'),
    gutil = require('gulp-util'),
    bower = require('bower'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    webserver = require('gulp-webserver'),
    open = require("gulp-open");

var paths = {
  sass: ['./www/scss/**/*.scss'],
  www: ['./www/']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./www/scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('serve', function() {
  gulp.src(paths.www + "index.html")
    .pipe(open("", { url: "http://localhost:8000" }));

  gulp.watch(paths.sass, ['sass']);

  gulp.src(paths.www)
    .pipe(webserver({
      livereload: true
    }));
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
