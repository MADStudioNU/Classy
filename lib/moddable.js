var eff = require('./eff')

// mods -> fn (moddable) -> Unit
function Moddable (mods) {
  return function (moddable) {
    var  m = eff.isArray(moddable.mods) ? moddable.mods : [ ]

    if (!mods)
      mods = [ ]
    else if (!eff.isArray(mods))
      mods = [ mods ]

    moddable.mods = mods.concat(m)
  }
}

module.exports = Moddable
