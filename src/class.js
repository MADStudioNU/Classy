var Selfish = require('../selfish')
  , modules = require('./modules')

function ClassyClass (constructor, classModules) {

  function Constructor () {
    return function () {
      var args = [].slice.call(arguments)
      return Selfish.variadic.any([ constructor ].concat(args))
    }
  }

  function ClassyClassDef (classModules) {
    return function (classyClass) {
      if (classModules && classModules.length)
        modules.call(classyClass, classModules)

      classyClass.use = function (instModules) {
        if (!instModules.length)
          instModules = [ instModules ]
        instModules.push(constructor)
        return ClassyClass(modules.compose(instModules), classModules)
      }
    }
  }

  return Selfish.simple(ClassyClassDef(classModules), Constructor())
}

module.exports = ClassyClass
