var Selfish$Simple   = require('./simple.js')
  , Selfish$Variadic = require('./variadic.js')

module.exports = function Selfish () {
  if (arguments.length > 1)
    return Selfish$Variadic.apply(null, arguments)
  return Selfish$Simple(arguments[0])
}
