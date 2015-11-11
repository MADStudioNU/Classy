
var Selfish = require('selfish-js')
  , Const   = require('const')
  , eff     = require('./eff')

function Moddable (definition, base, mods) {
  var moddable

  base     = (base instanceof Function) ? base : Const
  mods     = (mods instanceof Array)    ? mods : [ ]

  moddable = Selfish.simple(definition, base())
  moddable.mods = mods

  return moddable
}

Moddable.compose = eff.composeApplyLast

module.exports   = Moddable
