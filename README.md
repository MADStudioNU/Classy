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
using function and prototypes, you can use ClassyClasses instead.

  * ClassyClasses are objects ([using Object.create(null)](#bare-by-default))
  * Everything is defined with composition
  * Every feature is a plugin, defined as a composeable function
  * Has no contextual `this` (powered by [Selfish](https://github.com/mmlc/selfish))
  * Syntax so simple your cat could sit on your keyboard and use it by accident

  ```js
    var aClass = Classy(function (self) {
        self.field = 'value'
        self.method = function () {}
        // return is implied
    })
  ```

## Usage
### Show me some code

```js
var TrivialClass = Classy(function () {})

TrivialClass()
```

Is the simplest possible Classy Class.

This will return an Object (`{}`) that has absolutely no fields or methods,
and no prototype.

### Adding Features

Composition is first-class in Classy, and everythin that Classy does is an
application of composition.

Check it out:

```js
// A couple of features we want to mix in
var IsInstance = require('classy-js/core/is-instance')
  , ToString   = require('classy-js/core/to-string')
  , Compose    = require('classy-js/core/compose')

var Classy = require('classy-js')

// We want all our ClassyClasses to have `isInstance`, so let's create
//  a "class medium" for creating ClassyClasses that have it.
var Medium = Classy().use(IsInstance)

// Now we can `define` classes from that Medium
var Animal = Medium.define(function (animal, type) {
  animal.type = type
})

// Equivalently, we could have done:
var Animal = Classy()
  .use(IsInstance)
  .define(function (animal, type) {
    animal.type = type
  })

// But using a Medium makes things a bit cleaner.

// Let's use that Animal class.
var Dog = Medium
  .use(ToString) // You can add another feature to the medium just for Dog
  .define(function (dog, name) {
    dog.name = name
  })
  .use(Compose(Animal, 'Dog'))

// So now Dog is "composed with" Animal.
// Let's add in some Dog actions.

// Dogs can bark
function Bark (dog) {
  dog.bark = function () {
    return dog.name + ' is barking! Woof! Woof!'
  }
}

// They can wag their tails
function WagTail (dog) {
  dog.wagTail = function () {
    return dog.name + ' is wagging his tail!'
  }
}

// Okay, let's compose those into Dog
Dog = Dog.use([ Bark, WagTail, ToString ])
// Notice that we can also add ToString to Dog here
// We added ToString to the Dog _class_, and now we're adding it to
//   every Dog _instance_.

// Let's play around with our new ClassyClasses!

Dog.toString()
// => Dog { toString: fn, isInstance: fn, constructor: function (dog...) {...} }

var fido = Dog('Fido')
// => { name: 'Fido', type: 'Dog', bark: fn, wagTail: fn, toString: fn }

fido.bark()     // => 'Fido is barking! Woof! Woof!'
fido.wagTail()  // => 'Fido is wagging his tail!'
fido.type       // => 'Dog'
fido.toString()
// => { name: 'Fido', type: 'Dog', bark: fn, wagTail: fn, toString: fn }

// We can check instances, too:
Animal.isInstance(fido) // true
Dog.isInstance(fido)    // true
Dog.isInstance(extend({}, fido, { type: 'Cat' }))    // false
Animal.isInstance(extend({}, fido, { type: 'Cat' })) // true

```

### Bare by Default

Because ClassyClasses use Object.create(null) as their basis, classes
are entirely bare by default - this is why every feature is a plugin,
and why ClassyClasses have no prototypes or `this`.

Here's an explicit, albeit contrived, example:

```js
var Truth = Classy(function (self) {
 self.life = 42
})

var theTruth = Truth()
// => { life: 42 }

theTruth.prototype
// => undefined

Object.getPrototypeOf(theTruth)
// => null

for (var fact in theTruth) {
 console.log('The Truth is ', fact, '=', theTruth[fact])
}
// [logged]: The Truth is life = 42

[ 'toString', 'valueOf', 'isPrototypeOf', 'hasOwnProperty' ].map(function (junk) {
 if (theTruth[junk]) return junk
})
// => []
```
