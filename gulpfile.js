var gulp = require('gulp'),
    clean = require('gulp-clean'),
    less = require('gulp-less'),
    jshint = require('gulp-jshint'),
    connect = require('gulp-connect'),
    plumber = require('gulp-plumber'),
    bowerFiles = require('gulp-bower-files'),
    rename = require('gulp-rename'),
    inject = require('gulp-inject'),
    filter = require('gulp-filter'),
    path = './.tmp/',
    onError = function (err) {
      console.log(err);
    };

gulp.task('clean', function() {
  return gulp.src( path + "*", {read: false} )
    .pipe( clean() );
});

gulp.task('bower', ['clean'], function() {
  var fontFilter = filter(['**/*.eot', '**/*.svg', '**/*.tff', '**/*.woff', '**/*.otf']),
      otherFilter = filter(['**/*.js','**/*.js.map', '**/*.css']);
  return bowerFiles()
    .pipe( plumber({ errorHandler: onError }) )
    .pipe( rename({dirname: ''}) )
    .pipe( fontFilter )
    .pipe( gulp.dest( path + 'fonts' ) )
    .pipe( fontFilter.restore() )
    .pipe( otherFilter )
    .pipe( gulp.dest( path ) );
});

gulp.task('scripts', function() {
   return gulp.src( './directive/*.js' )
     .pipe( jshint( './.jshintrc' ) )
     .pipe( jshint.reporter( 'default' ) )
     .pipe( gulp.dest( path ) )
     .pipe( connect.reload( ) );
});

gulp.task('styles', function() {
  return gulp.src( './directive/*.less' )
    .pipe( plumber({ errorHandler: onError }) )
    .pipe( less( ) )
    .pipe( gulp.dest( path ) )
    .pipe( connect.reload( ) );
});

gulp.task('views', function() {
  return gulp.src( './directive/*.html' )
    .pipe( gulp.dest( path ) )
    .pipe( connect.reload( ) );
});

gulp.task('inject', ['styles', 'scripts', 'views'], function() {

  gulp.src(path + 'index.html')
    .pipe( inject( gulp.src( path + "*.{js,css}", {read: false} ), {ignorePath: path.substr(1,path.length)} ) ) // Not necessary to read the files (will speed up things), we're only after their paths
    .pipe(gulp.dest(path));


//  return gulp.src(path + 'index.html')
//    .pipe( gulp.plugin.inject(gulp.src([path + 'styles/**/*.css'], {read: false}), // Not necessary to read the files (will speed up things), we're only after their paths
//      {
//        starttag: '<!--inject:{{ext}}-->',
//        endtag: '<!--endinject-->',
//        ignorePath: path.substr(1,path.length),
//        sort: function(a, b) {
//          if (a.filepath.indexOf('vendor') !== -1 && b.filepath.indexOf('vendor') === -1){
//            return -1;
//          }
//          else return a>=b;
//        }
//      }))
//    .pipe(gulp.dest(path));
});

gulp.task('connect', ['build'], function(){
  connect.server({
    root: path,
    port: 8007,
    livereload: true
  })
});

gulp.task('watch', ['connect'], function() {
  gulp.watch( 'directive/*.js', ['scripts'] );
  gulp.watch( 'directive/*.less', ['styles'] );
  gulp.watch( 'directive/*.html', ['views'] );
});

gulp.task('build', ['scripts', 'styles', 'views', 'inject']);

gulp.task('default', ['clean', 'bower'], function () {
  return gulp.start('build', 'connect', 'watch');
});