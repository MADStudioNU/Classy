var Selfish   = require('selfish-js')
  , Const     = require('const')
  , Moddable  = require('./lib/moddable')
  , eff       = require('./lib/eff')

// NOTE(jordan): this gets fairly convoluted. Could it be better?

function ClassyClass (constructor, classModules) {
  var Constructor = Const (
    function () {
      var args = [].slice.call(arguments)
      return Selfish.variadic.any([ constructor ].concat(args))
    }
  )

  function Class (classyClass) {
    if (classModules instanceof Array)
      eff.callEach(classyClass, classModules)

    if (!classyClass.__instModules)
      classyClass.__instModules = [ ]

    classyClass.use = function (instModules) {
      var newInstModules = [].slice.call(classyClass.__instModules)
      /* NOTE(jordan): here's where it gets tricky
       * push the constructor onto the new modules
       * (notice the constructor contains a built-up composition of all
       *  the modules coming before)
       */
      instModules = instModules instanceof Array ? instModules : [ instModules ]
      instModules.push(constructor)
      /* Then compose the new modules with the constructor and create a
       * new ClassyClass
       */
      var C = ClassyClass(Moddable.compose(instModules), classModules)
      /* DON'T push the constructor onto the growing modules list
       * It would be pretty dumb to try and call it twice
       */
      C.__instModules = newInstModules
      return C
    }
  }

  return Moddable(Class, Constructor, classModules)
}

module.exports = ClassyClass
