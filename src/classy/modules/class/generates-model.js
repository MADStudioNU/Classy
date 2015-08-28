var Classy$Module = require('classy/module')

function NoDefault () {
  return NoDefault;
}

var classFields = function (classyClass) {
  var classFields = [];
  for (var field in classyClass)
    classFields.push(field)

  return classFields;
}

var classValues = function (classyClass, classFields) {
  var classValues = [];
  classFields.forEach(function (f) {
    var v = classyClass[f];
    classValues.push(v ? v : NoDefault)
  })
  return classValues;
}

var classModel = function (classyClass, classFields, classFieldValues) {
  var classModel = {};
  var value;
  classFields.forEach(function(f, i) {
    classModel[f] = classFieldValues[i];
  })
  return classModel;
}

var GeneratesModel = Classy$Module.$Class(function Classy$Class$GeneratesModel (classyClass) {
  var reference = classyClass();
  classyClass.fields = classFields(reference);
  classyClass.values = classValues(reference, classyClass.fields);
  classyClass.model  = classModel(reference, classyClass.fields, classyClass.values);
})

GeneratesModel.NoDefault = NoDefault;

module.exports = GeneratesModel;
