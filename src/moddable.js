
var Selfish = require('selfish-js')
  , Thunk   = require('kathunk')
  , eff     = require('./eff')

function Moddable (definition, base, mods) {
  var moddable

  base     = base instanceof Function ? base : function () { }
  mods     = mods instanceof Array ? mods : [ ]

  moddable = Selfish.simple(definition, base())
  moddable.mods = mods

  return moddable
}

Moddable.append   = eff.pushEach
Moddable.apply    = eff.callEach
Moddable.compose  = eff.composeApplyLast

module.exports    = Moddable
