var Selfish     = require('selfish-js')
  , Const       = require('const')
  , Class       = require('./class')
  , ClassMedium = require('./class-medium')
  , Moddable    = require('./moddable')

var ClassyBase = function (constructor) {
  if (!constructor)
    return ClassMedium()
  else
    return Class(constructor)
}

module.exports = Selfish.simple(Const, ClassyBase)
