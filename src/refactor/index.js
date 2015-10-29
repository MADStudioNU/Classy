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
      var newMods = { core: [].slice(mods.core), base: undefined }

      if (type == 'core')
        newMods.core.push(mod)
      if (type == 'base')
        newMods.base = mod

      return ClassyMod(newMods)
    }
  }
}

function ClassyMod (mods) {
  return Selfish.simple(classyDef(mods), ClassyFactory(mods))
}

var baseMods = { core: [], base: undefined }

Classy = ClassyMod(baseMods)

module.exports = Classy
