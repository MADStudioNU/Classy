/*
 * Usage
 * ********************
 *
 * var Classy$WithToString = Classy.extend(ToString);
 *
 * var Animal = Classy$WithToString(2, function (self, type, name) {
 *   self.type = type;
 *   self.name = name;
 * })
 *
 * var jimTheCricket = Animal('Cricket', 'Jim');
 *
 * jimTheCricket.toString()
 * /* => {
 *  *      type: Cricket,
 *  *      name: Jim
 *  *    }
 *  *
 *  * /
 *
 */

var toString = function serializeClassToString (self) {
  self.toString = function () {
    var stringParts = [];
    for (var field in self)
      stringParts.push(field + ': ' + self[field].toString());
    return '{\n\t' + stringParts.join(',\n\t') + '\n}';
  }
}

module.exports = toString;
