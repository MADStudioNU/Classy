var Selfish = require('../selfish')
  , eff     = require('./eff')

module.exports = Selfish.simple(function (modules) {

  modules.call = function (target, modules) {
    if (modules.length) {
      eff.callEach(modules, target)
    } else {
      target(modules)
    }
  }

  modules.compose = eff.composeApplyLast

})
