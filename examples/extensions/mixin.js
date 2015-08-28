/*
 * Usage
 * ********************
 *
 * var Mixed = Classy.extend(Mixin({
 *   a: 'hello',
 *   b: function () { return 17; }
 * }))
 *
 * var MixedClass = Mixed(function (self) {
 *   self.keys = function () {
 *    var fields = [];
 *    for (var field in self)
 *      fields.push(field)
 *    return fields;
 *   }
 * })
 *
 * var aMixedClass = MixedClass();
 * // => { a: 'hello', b: function () { return 17; }, keys: function () {...} }
 *
 * aMixedClass.keys()
 * // => [ 'a', 'b', 'fieldNames' ]
 *
 */

var mixin = function addFieldValuePairsToClass (fieldValuePairs) {

  var fields = Object.keys(fieldValuePairs);
  var values = fields.map(function (field) {
    return fieldValuePairs[field];
  })

  return function (self) {
    var fvi, field, value, len = fields.length
    for (fvi = 0; fvi < len, field = fields[fvi], value = values[fvi]; ++fvi)
      self[field] = value;
  }
}

module.exports = mixin;
