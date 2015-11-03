# Classy
### The demure class constructor constructor
#### (Yes, [class constructor constructor](http://blog.fluffywaffles.io/classy).)
#### It's also often faster than function

Author: [Jordan Timmerman (@skorlir)](https://github.com/skorlir)

Built at the [Northwestern University WCAS Multimedia Learning Center](https://github.com/mmlc)

[![Build Status](https://travis-ci.org/mmlc/Classy.svg?branch=master)](https://travis-ci.org/mmlc/Classy)

## What

With good manners, and the right utensils, you can do anything.

Put another way: you don't need prototypes. You don't need Classes. You don't need `super`
or `interface`. With a small set of powerful functions for composing simple data structures,
you can build anything.

That's Classy. The no-system class system. It's just composition.

## Features

Classy is a composeable class constructor constructor. Anyplace you might imagine yourself
using function and prototypes, you can use Classy Classes instead.

Classy:

  * Very few assumptions about how you will use it
    * Class Instances don't have any default methods or fields
    * Neither do Classes
  * `self` instead of `this` (powered by [Selfish](https://github.com/mmlc/selfish))
    * `self` is always your class instance
    * No weird stuff like `arr.push.bind(arr)`: there's no "context," only `self`
  * [Completely Bare by default](#what-exactly-do-you-mean-by-bare-by-default)
  * Entirely compositional
  * Multiple inheritance (via composition)
  * Simple syntax (see [Usage](#usage) for more examples):

  ```js
    var aClass = Classy(function (self) {
        self.field = 'value'
        self.method = function () {}
    })
  ```

## Usage
### Show me some code

Classy classes are completely empty by default:

```js
var EmptyClass = Classy(function () {})

EmptyClass()
```

will return an Object (`{}`) that has absolutely no fields or methods, and
no prototype.

### Adding Features

Composition is first-class in Classy, and it's how every class and instance
feature is defined and included.

Additionally, you can change (slightly) the ways that features are defined
and included by using Classy mods. These create a whole new Classy.

Check it out:

```js
// We're going to use the Compose mod
var Compose = require('classy-mod-compose')

// And a couple of Class/Instance features
var IsInstance = require('classy-is-instance')
  , ToString = require('classy-to-string')

// Supposing you want to inherit from/compose with other Classy Classes,
// you can import Classy with a Compose mod that lets you do that.
var Classy = require('classy-js').mod(Compose)

var Animal = Classy() // To add class-level methods, defer specifying
  .use(IsInstance)    // a constructor until later, with `define`.
  .define(function (animal, type) {
    animal.type = type
  })

var Dog = Classy()
  .use([ ToString, IsInstance ]) // again, let's add some class-level features
  .compose(Animal, 'Dog')        // now compose with Animal, with 'Dog' for type
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
Dog.toString()
// => Dog { toString: fn, isInstance: fn, constructor: function (dog...) {...} }

var fido = Dog('Fido')
// => { name: 'Fido', type: 'Dog', bark: fn, wagTail: fn, toString: fn }

fido.bark()     // => 'Fido is barking! Woof! Woof!'
fido.wagTail()  // => 'Fido is wagging his tail!'
fido.type       // => 'Dog'
fido.toString()
// => { name: 'Fido', type: 'Dog', bark: fn, wagTail: fn, toString: fn }

// And we can check instances, too:
Animal.isInstance(fido) // true
Dog.isInstance(fido)    // true
Dog.isInstance(extend({}, fido, { type: 'Cat' }))    // false
Animal.isInstance(extend({}, fido, { type: 'Cat' })) // true

```

### What exactly do you mean by Bare by Default?

Here's an explicit, albeit slightly contrived, example:

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
