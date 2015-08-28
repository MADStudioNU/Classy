var gulp       = require('gulp')
  , gutil      = require('gulp-util')
  , source     = require('vinyl-source-stream')
  , buffer     = require('vinyl-buffer')
  , browserify = require('browserify')

gulp.task('bundle', [], function () {

  var b = browserify({
    entries: 'src',
    paths: [ 'src', '.' ]
  })

  b.on('log', gutil.log)

  return b.bundle()
    .pipe(source('classy.bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist/'))
})

gulp.task('default', [ 'bundle' ]);
