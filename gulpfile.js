var gulp       = require('gulp')
  , bifywify   = require('bify-wify')
  , karma      = require('karma')

function Run () {
  var args = [].slice.call(arguments, 1)
    , action = arguments[0]
  return function () {
    return action.apply(null, args)
  }
}

gulp.task('bundle:standalone', Run (
  bifywify.fbify, 'index.js', 'classy.bundle.js', { standalone: 'Classy' }
))

gulp.task('bundle:standalone:watch', Run (
  bifywify.fwify, 'index.js', 'classy.bundle.js', { standalone: 'Classy' }
))

gulp.task('bundle:src', Run (
  bifywify.fbify, 'index.js', 'classy.bundle.js'
))

gulp.task('bundle:src:watch', Run (
  bifywify.fwify, 'index.js', 'classy.bundle.js'
))

gulp.task('bundle:test', Run (
  bifywify.fbify, 'tests/classy.spec.js', 'classy.spec.js'
))

gulp.task('bundle:test:watch', Run (
  bifywify.fwify, 'tests/classy.spec.js', 'classy.spec.js'
))

gulp.task('test', [ 'bundle:test' ], function (done) {
  var server = new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done)
  server.start()
})

gulp.task('test:travis', [ 'bundle:test' ], function (done) {
  var server = new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    browsers: [ 'PhantomJS', 'Firefox' ]
  }, done)
  server.start()
})

gulp.task('tdd', [ 'bundle:test:watch' ], function (done) {
  var server = new karma.Server({
    configFile: __dirname + '/karma.conf.js',
  }, done)
  return server.start()
})
