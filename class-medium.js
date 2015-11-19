var Const       = require('const')
  , ClassyClass = require('./class')
  , Moddable    = require('./lib/moddable')
  , Selfish     = require('selfish-js')

var MediumDefinition = function (medium, mediumModules) {
  eff.callEach(medium, mediumModules)

  medium.use = function (newClassModules) {
    return Selfish.simple(Moddable(newClassModules), medium)
  }

  medium.define = function (constructor) {
    return ClassyClass(medium._appliedMods)
  }
}

module.exports = function Medium (modules)  {
  return Selfish.variadic[1]([ MediumDefinition, modules ], Moddable())
}
