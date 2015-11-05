var gulp       = require('gulp')
  , bifywify   = require('bify-wify')
  , karma      = require('karma')

function Do () {
  var args = [].slice.call(arguments, 1)
    , action = arguments[0]
  return function () {
    action.apply(null, args)
  }
}

gulp.task('bundle:standalone', Do (
  bifywify.fbify, 'src', 'classy.bundle.js', { standalone: 'Classy' }
))

gulp.task('bundle:standalone:watch', Do (
  bifywify.fwify, 'src', 'classy.bundle.js', { standalone: 'Classy' }
))

gulp.task('bundle:src', Do (
  bifywify.fbify, 'src', 'classy.bundle.js'
))

gulp.task('bundle:src:watch', Do (
  bifywify.fwify, 'src', 'classy.bundle.js'
))

gulp.task('bundle:test', Do (
  bifywify.fbify, 'tests', 'classy.spec.js'
))

gulp.task('bundle:test:watch', Do (
  bifywify.fwify, 'tests', 'classy.spec.js'
))

gulp.task('bundle', [ 'bundle:src', 'bundle:test' ])

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
