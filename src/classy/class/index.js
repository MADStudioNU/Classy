var Selfish$Simple   = require('../../selfish/simple')
  , Selfish$Variadic = require('../../selfish/variadic')

// Optimize common #s of args, avoid using apply
var Classy$Class$Constructor = function (nArgs, constructor) {
  switch(nArgs) {
    case 0:
      return function Classy$Class () {
        return Selfish$Simple(constructor)
      }
    case 1:
      return function Classy$Class (a) {
        return Selfish$Variadic[1](constructor, a)
      }
    case 2:
      return function Classy$Class (a, b) {
        return Selfish$Variadic[2](constructor, a, b)
      }
    case 3:
      return function Classy$Class (a, b, c) {
        return Selfish$Variadic[3](constructor, a, b, c)
      }
    default:
      return function Classy$Class$Variadic () {
        var args = [].slice.call(arguments);
        return Selfish$Variadic.any.apply(null, [ constructor ].concat(args))
      }
  }
}

module.exports = Classy$Class$Constructor;
