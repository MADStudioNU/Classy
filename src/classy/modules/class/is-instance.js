var Classy$Module = require('classy/module')
  , Classy$Class$GeneratesModel = require('./generates-model.js').moduleDef

function Classy$Class$IsInstance (classyClass) {
  // Make sure we get a model for instance checking
  if (!classyClass.model) Classy$Class$GeneratesModel(classyClass);

  classyClass.isInstance = function (object, strict) {
    var i, field, value,
        fields = classyClass.fields,
        values = classyClass.values,
        len = fields.length,
        strict = strict || false
    for (i = 0; i < len, field = fields[i], value = values[++i];) {
      var objectValue = object[field];
      if (!objectValue || (value != undefined && objectValue != value)) {
        return false;
      }
    }
    if (strict) {
      if (Object.getPrototypeOf(object) != null) return false;
      for (var field in object) {
        if (!classyClass.model[field]) return false;
      }
    }
    return true;
  }
}
var Classy$IsInstance = Classy$Module.$Class(Classy$Class$IsInstance)

module.exports = {
  module   : Classy$IsInstance,
  moduleDef: Classy$Class$IsInstance
}
