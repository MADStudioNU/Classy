var gulp       = require('gulp')
  , gutil      = require('gulp-util')
  , source     = require('vinyl-source-stream')
  , buffer     = require('vinyl-buffer')
  , browserify = require('browserify')
  , watchify   = require('watchify')
  , karma      = require('karma')

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

gulp.task('bundle:watch', [], function () {
  var b = browserify({
    debug: true,
    entries: 'src',
    paths: [ 'src', '.' ]
  })

  function bundle() {
    return b.bundle()
      .pipe(source('classy.bundle.js'))
      .pipe(buffer())
      .pipe(gulp.dest('dist/'))
  }

  b = watchify(b);

  b.on('log', gutil.log)
  b.on('update', bundle);

  bundle();
})

gulp.task('test', [ 'bundle' ], function (done) {
  var server = new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done)
  return server.start();
})

gulp.task('tdd', [ 'bundle:watch' ], function (done) {
  var server = new karma.Server({
    configFile: __dirname + '/karma.conf.js'
  }, done)
  return server.start();
})

gulp.task('default', [ 'bundle' ]);
