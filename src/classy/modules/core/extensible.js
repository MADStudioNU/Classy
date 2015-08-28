var Classy$Module = require('classy/module');

var Classy$Extensible = Classy$Module.$Core(function (ClassyImpl) {
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
})

module.exports = Classy$Extensible;
