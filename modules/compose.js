var Compose = function (otherClass) {
  var args = [].slice.call(arguments, 1)
  var base = otherClass.apply(null, args)

  return function (inst) {
    Object.keys(base).forEach(function (prop) {
      inst[prop] = base[prop]
    })
  }
}

module.exports = Compose
