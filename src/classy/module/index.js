var Classy$ModuleForType = function (type) {
  return function AddModule (moduleFn) {
    return function AddModule$Inner (Classy) {
      var moduleClassy = Classy;

      if (type == 'core') moduleFn(moduleClassy);

      else if (type == 'class') {
        moduleClassy = function Classy$WithModules (nArgs, constructor) {
          var ClassyImpl$Class = Classy(nArgs, constructor);
          moduleFn(ClassyImpl$Class);
          return ClassyImpl$Class;
        }
      }

      return moduleClassy;
    }
  }
}

module.exports = {
  $Core: Classy$ModuleForType('core'),
  $Class: Classy$ModuleForType('class')
}
