var Classy$Class = require('classy/class')

var Classy$Base = function Classy (nArgs, constructor) {
  if (!constructor)
    constructor = nArgs, nArgs = 0
  return Classy$Class(nArgs, constructor);
}

module.exports = Classy$Base;
