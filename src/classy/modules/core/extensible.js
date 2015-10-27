var Classy$Module = require('../module');

var ClassyExtend = function (ClassyImpl) {
  ClassyImpl.extend = function Classy$Extensible$Extend (extension) {
    var extendedBody = function Classy$Extended (nArgs, constructor) {
      if (!constructor) constructor = nArgs, nArgs = 0
      var extendedConstructor = function ClassyClass$Extended () {
        extension.apply(null, arguments)
        constructor.apply(null, arguments)
      }
      return ClassyImpl(nArgs, extendedConstructor);
    }
    return Classy$Extensible(extendedBody);
  }
}

var Classy$Extensible = Classy$Module.$Core(ClassyExtend)

module.exports = {
  module   : Classy$Extensible,
  moduleDef: ClassyExtend
}
