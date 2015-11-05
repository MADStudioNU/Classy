var Selfish     = require('selfish-js')
  , Const       = require('const')
  , ClassyClass = require('./class')
  , Moddable    = require('./moddable')

var Medium = function (medium) {
  medium.use = function (classModules) {
    var newClassModules = [ ].slice.call(medium.mods)

    Moddable.append(newClassModules, classModules)

    return Moddable(Medium, Const, newClassModules)
  }

  medium.define = function (constructor) {
    return ClassyClass(constructor, medium.mods)
  }
}

module.exports = Const(Moddable(Medium))
