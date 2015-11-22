var Selfish     = require('selfish-js')
  , ClassyClass = require('./class')
  , Moddable    = require('./lib/moddable')
  , eff         = require('./lib/eff')

var MediumDefinition = function (medium, mediumModules) {
  eff.callEach(medium, mediumModules)

  medium.use = function (newClassModules) {
    return Selfish.simple(Moddable(newClassModules), medium)
  }

  medium.define = function (constructor) {
    return ClassyClass(constructor, medium.mods)
  }
}

module.exports = function Medium (modules)  {
  return Selfish.variadic[1](MediumDefinition, modules)
}
