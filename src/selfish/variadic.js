var Selfish$Variadic$1 = function (constructor, a) {
  return (function (self) {
    constructor(self, a);
    return self;
  })(Object.create(null))
}

var Selfish$Variadic$2 = function (constructor, a, b) {
  return (function (self) {
    constructor(self, a, b);
    return self;
  })(Object.create(null))
}

var Selfish$Variadic$3 = function (constructor, a, b, c) {
  return (function (self) {
    constructor(self, a, b, c);
    return self;
  })(Object.create(null))
}

var Selfish$Variadic = function () {
  var args        = arguments
    , constructor = args[0]
  return (function (self) {
    args[0] = self;
    constructor.apply(this, args);
    return self;
  })(Object.create(null))
}

module.exports = {
  1: Selfish$Variadic$1,
  2: Selfish$Variadic$2,
  3: Selfish$Variadic$3,
  any: Selfish$Variadic
}
