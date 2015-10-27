var gulp       = require('gulp')
  , gutil      = require('gulp-util')
  , source     = require('vinyl-source-stream')
  , buffer     = require('vinyl-buffer')
  , browserify = require('browserify')
  , watchify   = require('watchify')
  , karma      = require('karma')

function bundle (b, name, dest) {
  return b.bundle()
    .pipe(source(name))
    .pipe(buffer())
    .pipe(gulp.dest(dest))
}

gulp.task('bundle:selfish', function () {

  var b = browserify({
    entries: 'src/selfish'
  })

  b.on('log', gutil.log)

  return bundle(b, 'selfish.bundle.js', 'dist')
})

gulp.task('bundle', [], function () {

  var b = browserify({
    entries: 'src',
    paths: [ 'src', '.' ]
  })

  b.on('log', gutil.log)

  return bundle(b, 'classy.bundle.js', 'dist')
})

gulp.task('bundle:refactor', function () {

  var b = browserify({
    entries: 'src/refactor'
  })

  b.on('log', gutil.log)

  return bundle(b, 'classy.refactor.bundle.js', 'dist')
})

gulp.task('bundle:watch', [], function () {
  var b = browserify({
    debug: true,
    entries: 'src',
    paths: [ 'src', '.' ]
  })

  function bundle() {
    return bundle(b, 'classy.bundle.js', 'dist')
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
  server.start();
})

gulp.task('test:travis', [ 'bundle' ], function (done) {
  var server = new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    browsers: [ 'PhantomJS', 'Firefox' ]
  }, done);
  server.start();
})

gulp.task('tdd', [ 'bundle:watch' ], function (done) {
  var server = new karma.Server({
    configFile: __dirname + '/karma.conf.js',
  }, done)
  return server.start();
})

gulp.task('default', [ 'bundle' ]);
