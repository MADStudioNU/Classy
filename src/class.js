var Selfish   = require('selfish-js')
  , Moddable  = require('./moddable')

// FIXME(jordna): This is atrocious and confusing, but I'm not
// going to be able to make it better tonight. Too tired.

function ClassyClass (constructor, classModules) {
  function Constructor () {
    return function () {
      var args = [].slice.call(arguments)
      return Selfish.variadic.any([ constructor ].concat(args))
    }
  }

  function Class (classyClass) {
    if (classModules && classModules.length)
      Moddable.apply(classModules, classyClass)

    if (!classyClass.instModules)
      classyClass.instModules = [ ]

    classyClass.use = function (instModules) {
      var newInstModules = [].slice.call(classyClass.instModules)
      Moddable.append(newInstModules, instModules)
      var composition = [].slice.call(newInstModules)
      composition.push(constructor)
      var C = ClassyClass(Moddable.compose(composition), classModules)
      C.instModules = newInstModules
      return C
    }
  }

  return Moddable(Class, Constructor, classModules)
}

module.exports = ClassyClass
