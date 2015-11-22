var Selfish   = require('selfish-js')
  , Moddable  = require('./lib/moddable')
  , eff       = require('./lib/eff')

var ClassBase = function () {
  return function classyClass () {
    var args = [].slice.call(arguments)
      , constructor = eff.composeApplyLast(classyClass.mods)
    return Selfish.variadic.any([ constructor ].concat(args))
  }
}

function ClassDefinition (classyClass, classModules) {
  eff.callEach(classyClass, classModules)

  classyClass.use = function (instModules) {
    return Selfish.simple(Moddable(instModules), classyClass.clone())
  }

  classyClass.clone = function () {
    var c = Selfish.simple(Moddable(classyClass.mods), ClassBase())
    eff.callEach(c, classModules)
    return c
  }
}

function ClassyClass (constructor, classModules) {
  var base = Selfish.simple(Moddable(constructor), ClassBase())
  return Selfish.variadic[1](ClassDefinition, classModules, base)
}

module.exports = ClassyClass
