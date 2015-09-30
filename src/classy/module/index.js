
var extendMethods = function (to, from) {
  for (var method in from) {
    if ((from[method] instanceof Function) && to[method] == undefined) {
      to[method] = from[method];
    }
  }
}

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
        // NOTE(jordan): preserves core modules
        extendMethods(moduleClassy, Classy);
      }

      return moduleClassy;
    }
  }
}

module.exports = {
  $Core: Classy$ModuleForType('core'),
  $Class: Classy$ModuleForType('class')
}
