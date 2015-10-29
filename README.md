# Classy
### The demure class constructor constructor
#### (Yes, [class constructor constructor](http://blog.fluffywaffles.io/classy).)
#### It's also often faster than function, because it uses Object.create instead of `new`

Author: [Jordan Timmerman (@skorlir)](https://github.com/skorlir)

Built at the [Northwestern University WCAS Multimedia Learning Center](https://github.com/mmlc)

[![Build Status](https://travis-ci.org/mmlc/Classy.svg?branch=master)](https://travis-ci.org/mmlc/Classy)

## What

With good manners, and the right utensils, you can do anything.

Put another way, with a small set of powerful functions for composing simple data structures,
you can build anything - you don't need Classes or Prototypes.

In fact, Classy eschews Prototypes and classical inheritance patterns and just about everything.
And it can do everything you need. Plus, it's fast, clean, and super composeable, with a
clear and very concise API the likes of which you just don't see in a prototypal world.

## Features

Classy is a composeable class constructor constructor. Anyplace you might imagine yourself
using function and prototypes, you can use Classy Classes instead.

**Here are some of the features of Classy:**
  * Substitutes `self` for `this` - and `self` is *always* your instance, even in callbacks
  * Enforces composition over OOP inheritance
  * Multiple inheritance (not Classical Inheritance)
  * Provides a simple syntax (see [Usage](#show-me-some-code) for more examples):
```js
  var aClass = Classy(function (self) {
      self.field = 'value';
      self.method = function () {};
  })
```
  * [Completely Bare](#overview-of-classy)

## Explanation
### Overview of Classy

All the features of Classy are opt-in only.

If you want a detailed explanation of the design, check out [design.md](./DESIGN.md).

Basically, Classy gives you no more than the absolute minimum: a totally bare object.
Then you add in the things you want.

You'll never have anything you don't want or need, and Object.hasOwnProperty
is totally unnecessary: you'll never have a method from somewhere else pollute your Instance.

### Show me some code

Classy classes are completely empty by default:

```js
var EmptyClass = Classy(function () {});

EmptyClass()
```

will return an Object (`{}`) that has absolutely no fields or methods.

### More code!

```js
var Truth = Classy(function (self) {
 self.life = 42;
});
// => ClassyClass () { ... }

var theTruth = Truth();
// => { life: 42 }

theTruth.prototype;
// => undefined
Object.getPrototypeOf(theTruth);
// => null

for (var fact in theTruth) {
 console.log('The Truth is ', fact, '=', theTruth[fact]);
}
// => The Truth is life = 42

[ 'toString', 'valueOf', 'isPrototypeOf', 'hasOwnProperty' ].map(function (junk) {
 if (theTruth[junk]) return junk;
})
// => []
```

### YOu sAid ther would be CODE

Composition is a first-class feature in Classy. Check it out:
```js

// supposing you want to inherit from/compose with other Classy Classes,
// you can import Classy with a Compose mod
var Classy = require('classy-js').mod(Compose)

var Animal = Classy() // to add class-level methods, defer specifying
  .use(IsInstance)    // a constructor until later, with `define`
  .define(function (animal, type) {
    animal.type = type
  })

var Dog = Classy()
  .use([ ToString, IsInstance ]) // like above, let's add some class-level features
  .compose(Animal, 'Dog')        // compose with Animal, passing in Dog for type
  .define(function (dog, name) {
    dog.name = name
  })

// now we can mix in Instance fields/methods
// keep in mind: `use` and `compose` et. al are ALWAYS immutable (return new objects)
function Bark (dog) {
  dog.bark = function () {
    return dog.name + ' is barking! Woof! Woof!'
  }
}

function WagTail (dog) {
  dog.wagTail = function () {
    return dog.name + ' is wagging his tail!'
  }
}

// Notice you can use the exact same ToString function. Composition!
Dog = Dog.use([ Bark, WagTail, ToString ])

// Class-level features are on the Class object, not on the instance
Dog.toString() // Dog { toString: fn, isInstance: fn, constructor: function (dog, name) {...} }

var fido = Dog('Fido')

fido.bark()     // 'Fido is barking! Woof! Woof!'
fido.wagTail()  // 'Fido is wagging his tail!'
fido.type       // 'Dog'
fido.toString() // { name: 'Fido', type: 'Dog', bark: fn, wagTail: fn }

// And we can do this, too
Animal.isInstance(fido) // true
Dog.isInstance(fido)    // true
Dog.isInstance(extend({}, fido, { type: 'Cat' }))    // false
Animal.isInstance(extend({}, fido, { type: 'Cat' })) // true

```
