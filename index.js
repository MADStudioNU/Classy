var Class       = require('./class')
  , ClassMedium = require('./class-medium')

var ClassyBase = function () {
  return function (constructor) {
    return constructor
           ? Class(constructor)
           : ClassMedium()
  }
}

module.exports = ClassyBase()
