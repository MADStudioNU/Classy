var Selfish             = require('../selfish')
  , modules             = require('./modules')
  , ClassyClass         = require('./class').Class
  , ClassyClassMedium   = require('./class').Medium

function ClassyFactory (mods) {

  return function (constructor) {
    if (!constructor)
      return ClassyClassMedium(mods)
    else
      return ClassyClass(constructor)
  }

}

function classyDef (mods) {
  return function (classy) {
    classy.mod = function (type, mod) {
      var newMods = [].slice.call(mods)

      newMods.push(mod)

      return ClassyMod(newMods)
    }
  }
}

function ClassyMod (mods) {
  return Selfish.simple(classyDef(mods), ClassyFactory(mods))
}

var baseMods = []

module.exports = Classy = ClassyMod(baseMods)
