var gulp = require('gulp'),
    less = require('gulp-less'),
    jshint = require('gulp-jshint'),
    connect = require('gulp-connect'),
    plumber = require('gulp-plumber'),
    filter = require('gulp-filter'),
    path = './demo/',
    onError = function (err) {
      console.log(err);
    };

gulp.task('scripts', function() {
   return gulp.src( './js/*.js' )
     .pipe( jshint( './.jshintrc' ) )
     .pipe( jshint.reporter( 'default' ) )
     .pipe( gulp.dest( path ) )
     .pipe( connect.reload( ) );
});

gulp.task('styles', function() {
  return gulp.src( path + '*.less' )
    .pipe( plumber({ errorHandler: onError }) )
    .pipe( less( ) )
    .pipe( gulp.dest( path ) )
    .pipe( connect.reload( ) );
});

gulp.task('views', function() {
  return gulp.src( path + '*.html' )
    .pipe( connect.reload( ) );
});

gulp.task('connect', ['assets'], function(){
  connect.server({
    root: path,
    port: 8007,
    livereload: true
  })
});

gulp.task('watch', ['connect'], function() {
  gulp.watch( 'js/*.js', ['scripts'] );
  gulp.watch( 'demo/*.less', ['styles'] );
  gulp.watch( 'demo/*.html', ['views'] );
});

gulp.task('build', function() {
  path = './build/';
  gulp.start('scripts');
});

gulp.task('assets', ['scripts', 'styles']);

gulp.task('demo', ['assets'], function () {
  return gulp.start('connect', 'watch');
});

gulp.task('default', ['demo']);