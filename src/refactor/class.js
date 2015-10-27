var Selfish = require('../selfish')
  , modules = require('./modules')

function ClassyClassMedium (classModules) {
  return Selfish.simple(function (medium) {
    medium.use = function (classModule) {
      classModules = (classModules && classModules.length) ? classModules : [ ]

      var newModules

      if (classModule.length) {
        newModules = classModules.concat(classModule)
      } else {
        newModules = [].slice.call(classModules)
        newModules.push(classModule)
      }

      return ClassyClassMedium(newModules)
    }

    medium.define = function (constructor) {
      return ClassyClass(constructor, classModules)
    }

  })
}

function ClassyClass (constructor, classModules) {
  function MakeClass () {
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

  return Selfish.simple(ClassyClassDef(classModules), MakeClass())
}

function ClassyClassOrMedium (constructor) {
  if (!constructor)
    return ClassyClassMedium()
  else
    return ClassyClass(constructor)
}

// FIXME: delete
window.ClassyClass = ClassyClassOrMedium

module.exports = ClassyClassOrMedium
