var Selfish   = require('selfish-js')
  , Thunk     = require('kathunk')
  , Moddable  = require('./moddable')

// NOTE(jordan): this gets fairly convoluted. Could it be better?

function ClassyClass (constructor, classModules) {
  var Constructor = Thunk (
    function () {
      var args = [].slice.call(arguments)
      return Selfish.variadic.any([ constructor ].concat(args))
    }
  )

  function Class (classyClass) {
    if (classModules instanceof Array)
      Moddable.apply(classModules, classyClass)

    if (!classyClass.instModules)
      classyClass.instModules = [ ]

    classyClass.use = function (instModules) {
      var newInstModules = [].slice.call(classyClass.instModules)
      Moddable.append(newInstModules, instModules)
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
      var C = ClassyClass(Moddable.compose(instModules), classyClass.constructor, classModules)
      C.instModules = newInstModules
      return C
    }
  }

  return Moddable(Class, Constructor, classModules)
}

module.exports = ClassyClass
