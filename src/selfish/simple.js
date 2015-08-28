var Selfish$Simple = function (constructor) {
  return (function (self) {
    constructor(self);
    return self;
  })(Object.create(null))
}

module.exports = Selfish$Simple;
