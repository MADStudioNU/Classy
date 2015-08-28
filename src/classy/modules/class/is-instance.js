var Classy$Module = require('clasy/module')
  , Classy$Class$GeneratesModel = require('classy/modules/class/generates-model.js')

var IsInstance = Classy$Module.$Class(function Classy$Class$WithIsInstance (c) {
  // Make sure we get a model for instance checking
  c = Classy$Class$GeneratesModel(c);

  c.isInstance = function (object) {
    var i, field, value,
        fields = c.fields,
        values = c.values,
        len = fields.length
    for (i = 0; i < len, field = fields[i], value = values[++i];) {
      var objectValue = object[field];
      if (!objectValue || (value != undefined && objectValue != value)) {
        return false;
      }
    }
    return true;
  }
})

module.exports = IsInstance;
