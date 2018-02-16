var gulp = require('gulp'),
	concatCss    = require('gulp-concat-css'),
	rename       = require('gulp-rename'),
	notify       = require('gulp-notify'),
	livereload   = require('gulp-livereload'),
	connect      = require('gulp-connect'),
	autoprefixer = require('gulp-autoprefixer'),
    less         = require('gulp-less'),
    fileinclude  = require('gulp-file-include'),
    plumber      = require('gulp-plumber'),
    prettify     = require('gulp-html-prettify'),
    csso         = require('gulp-csso'),
    csscomb      = require('gulp-csscomb'),
    dirSync      = require('gulp-dir-sync');

//server connect
gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});

//paths
var paths = {
  js: 'src/js/*',
  css: 'src/less/*.css',
  less: 'src/less/all.less',
  html: 'src/*.html',
  fileinclude: 'src/include/*.html',
  images: 'src/images/*',
  fonts: 'src/fonts/*',

  src: 'src/',
  dest: 'build/'
};

//js
gulp.task('js', function() {
    gulp.src(paths.js)
    .pipe(gulp.dest(paths.dest + 'js/'))
    .pipe(connect.reload());
});

//css
gulp.task('css', function() {
    gulp.src(paths.css)
    .pipe(gulp.dest(paths.dest + 'css'))
    .pipe(connect.reload());
});

//less
gulp.task('less', function() {
    gulp.src(paths.less)
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer({
        browsers: ['last 10 versions']
    }))
    .pipe(csscomb())
    .pipe(csso())
    .pipe(rename('all.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(connect.reload());
});

//fileinclude
gulp.task('fileinclude', function() {
  gulp.src(paths.html)
    .pipe(plumber())
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(gulp.dest(paths.dest))
    .pipe(connect.reload());
});

//images
gulp.task('img', function () {
  return gulp.src('src/images/*.*')
    .pipe(gulp.dest('build/images/'));
});

//fonts
gulp.task('fonts', function () {
  return gulp.src('src/fonts/*')
    .pipe(gulp.dest('build/fonts/'));
});

//watch
gulp.task('watch', function(){
    gulp.watch('src/images/*',['img'])
    gulp.watch(paths.js, ['js'])
    gulp.watch(paths.css, ['css'])
    gulp.watch('src/less/**/*.less', ['less'])
    gulp.watch(paths.html, ['fileinclude'])
    gulp.watch(paths.fonts, ['fonts'])
    gulp.watch(paths.fileinclude, ['fileinclude'])
})

//default
gulp.task('default', ['fileinclude', 'js', 'css', 'less', 'watch', 'fonts', 'img', 'connect']);