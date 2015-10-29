var Selfish = require('../selfish')
  , eff     = require('./eff')

module.exports = Selfish.simple(function (modules) {

  modules.apply = function (target, modules) {
    eff.callEach(modules, target)
  }

  modules.compose = eff.composeApplyLast

})
