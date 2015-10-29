var Selfish     = require('../selfish')
  , modules     = require('./modules')
  , ClassyClass = require('./class')

function ClassMedium (mods, classModules) {

  function Medium (coreMods) {
    return function (medium) {

      if (coreMods.length)
        modules.apply(medium, coreMods)

      medium.use = function (classModule) {
        classModules = (classModules && classModules.length) ? classModules : [ ]

        var newModules

        if (classModule.length) {
          newModules = classModules.concat(classModule)
        } else {
          newModules = [].slice.call(classModules)
          newModules.push(classModule)
        }

        return ClassMedium(mods, newModules)
      }

      medium.define = function (constructor) {
        return ClassyClass(constructor, classModules)
      }
    }
  }

  return Selfish.simple(Medium(mods.core), mods.base)
}

module.exports = ClassMedium
