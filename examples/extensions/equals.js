/*
 * Usage
 * ********************
 *
 * var Classy$Equalable = Classy.mixin(Equals);
 *
 * var Animal = Classy$Equalable.mixin(function (self) {
 *   self.sayHello = function () {
 *     return "Hello, my name is " + self.name + " and I am a " + self.type + "!";
 *   }
 * })
 *
 * var Cat = Animal(1, function (self, name) {
 *   self.type = 'Cat';
 *   self.name = name;
 * })
 *
 * var Dog = Animal(1, function (self, name) {
 *   self.type = 'Dog';
 *   self.name = name;
 * })
 *
 * var dolores = Cat('Dolores');
 * var doug = Dog('Doug');
 * var doloresWeirdTwin = Cat('Dolores');
 *
 * doug.equals(dolores)
 * // => false
 * dolores.equals(dolores)
 * // => true
 * dolores.equals(doloresWeirdTwin)
 * // => true
 * dolores == dolores
 * // => true
 * dolores == doloresWeirdTwin
 * // => false
 *
 */

var equals = function compareFieldsAndValues (self) {
  self.equals = function (other) {
    for (var field in self) {
      var value = other[field];
      if (value) {
        if (self[field] != value) return false;
      }
    }
    return true;
  }
}

module.exports = equals;
