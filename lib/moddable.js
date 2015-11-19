
var eff = require('./eff')

// mods -> fn (moddable) -> Unit
function Moddable (mods) {
  return function (moddable) {
    var am = moddable._appliedMods
      ,  m = moddable.mods

    am = eff.isArray(am) ? am : [ ]
    if (eff.isArray(m)) eff.pushEach(am, m)

    moddable._appliedMods = am
    moddable.mods = eff.isArray(mods) ? mods : [ ]
  }
}

module.exports = Moddable
