/// <reference path="www/index.html" />
/// <binding BeforeBuild='git-check' />
/// <reference path="www/index.html" />
/// <reference path="www/index.html" />
var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var inject = require('gulp-inject');
var injectString = require('gulp-inject-string');

var paths = {
    sass: ['./scss/**/*.scss'],
    js: ['./www/**/*.js'],
    css:['./www/**/*.css']
};

gulp.task('default', ['sass']);

gulp.task('sass', function (done) {
    gulp.src('./scss/ionic.app.scss')
      .pipe(sass())
      .on('error', sass.logError)
      .pipe(gulp.dest('./www/css/'))
      .pipe(minifyCss({
          keepSpecialComments: 0
      }))
      .pipe(rename({ extname: '.min.css' }))
      .pipe(gulp.dest('./www/css/'))
      .on('end', done);
});

gulp.task('jsFiles', function () {
    var target = gulp.src('./www/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(['./www/js/*.js', './www/pages/*.js', './www/**/*.css'], { read: false });

    return target.pipe(inject(sources))
        .pipe(injectString.replace('/www/', ''))
      .pipe(gulp.dest('./www'));
});


gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.js, ['jsFiles']); //include jsfiles into index.html 
});

gulp.task('install', ['git-check'], function () {
    return bower.commands.install()
      .on('log', function (data) {
          gutil.log('bower', gutil.colors.cyan(data.id), data.message);
      });
});

gulp.task('git-check', function (done) {
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
