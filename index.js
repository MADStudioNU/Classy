var Selfish     = require('selfish-js')
  , Thunk       = require('kathunk')
  , Class       = require('./class')
  , ClassMedium = require('./class-medium')
  , Moddable    = require('./moddable')
  , IsInstance  = require('./class-is-instance')
  , Compose     = require('./compose')

var ClassyBase = function (constructor) {
  if (!constructor)
    return ClassMedium()
  else
    return Class(constructor)
}

module.exports = Selfish.simple(Thunk, ClassyBase)
