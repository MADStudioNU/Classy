var Classy$ModuleForType = function (type) {
  return function (mod) {
    return function (ClassyImpl) {
      var modImpl = function Classy$WithModules (nArgs, constructor) {
        var ClassyImpl$Class = ClassyImpl(nArgs, constructor);
        if (type == 'class') mod(ClassyImpl$Class);
        return ClassyImpl$Class;
      }
      if (type == 'core') mod(modImpl);
      return modImpl;
    }
  }
}

module.exports = {
  $Core: Classy$ModuleForType('core'),
  $Class: Classy$ModuleForType('class')
}
