var Thunk = require('kathunk')

var Memo = function (action) {
  var args = [].slice.call(arguments, 1)
    , value = undefined

  return function () {
    if (value) return value
    return (value = action.apply(action, args))
  }
}

function NoDefault () { return NoDefault }

var GenerateModel = function (classyClass) {
  var base = classyClass()
  Object.keys(base).forEach(function (prop) {
    if (base[prop] === undefined)
      base[prop] = NoDefault
  })
  return base
}

IsInstance = function (classyClass) {
  var Model = Memo(GenerateModel, classyClass)

  classyClass.isInstance = function (someObject) {
    var model = Model()
    return Object.keys(model).every(function (prop) {
      return model[prop] === NoDefault ? true
        : model[prop] === someObject[prop]
    })
  }
}
