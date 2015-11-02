var Selfish     = require('selfish-js')
  , Thunk       = require('kathunk')
  , Class       = require('./class')
  , ClassMedium = require('./class-medium')
  , Moddable    = require('./moddable')

var ClassyBase = Thunk (
  function (constructor) {
    if (!constructor)
      return ClassMedium()
    else
      return Class(constructor)
  }
)

var Classy = function (classy) {
  classy.mod = function (mod) {
    var newMods = [].slice.call(classy.mods)

    Moddable.append(newMods, mod)

    return Moddable(Classy, ClassyBase, newMods)
  }
}

module.exports = Moddable(Classy, ClassyBase)
