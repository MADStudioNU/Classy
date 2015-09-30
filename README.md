# Classy
### The demure class constructor constructor
#### (Yes, [class constructor constructor](http://blog.fluffywaffles.io/classy).)
#### It's also often [faster than function](http://jsperf.com/classy-vs-function-real-world-init-only/3#results).

Author: [Jordan Timmerman (@skorlir)](https://github.com/skorlir)

Built at the [Northwestern University WCAS Multimedia Learning Center](https://github.com/mmlc)

[![Build Status](https://travis-ci.org/mmlc/Classy.svg?branch=master)](https://travis-ci.org/mmlc/Classy)

## Features

Classy is a constructor for classes. Anyplace you might imagine yourself using a `function` to make a class, you can use Classy instead.

**Here are some of the features of Classy:**
  * Substitutes `self` for `this` - and `self` is *always* your class instance, even in callbacks
  * Provides a simple syntax (see [Usage](#usage) for more examples):
```js
  var aClass = Classy(function (self) {
      self.field = 'value';
      self.method = function () {};
  })
```
  * [No Baggage](#gets-rid-of-baggage-what)
  * Often [faster than `new function () { ... }`](http://jsperf.com/classy-vs-function#results)
  * It's [Modular](./MODULES.README.md) and easy to customize
  * Including a module for writing Class [Extensions](#and-what-are-extensions)

## Explanation
### Overview of Classy

All the features of Classy are opt-in only.

Even Classy Extensions are actually provided by a Classy Module. Which means you can opt-out pretty easily - just `require('classy/base')` instead, and bam! no extensions, no `Classy.extend`.

If you want a detailed explanation of the design, check out [design.md](./DESIGN.md).

### Gets rid of baggage? What?

Functions have *baggage*. Classy classes *don't*.

In fact, Classy classes are completely empty by default:

```js
var EmptyClass = Classy(); EmptyClass();
```

will return an Object (`{}`) that has absolutely no fields or methods.

Maybe it's unfair to call prototypes "baggage." Whatever. You still don't need it.

####Here's a more drawn-out example:

```js
var Truth = Classy(function (self) {
 self.life = 42;
});
// => Classy$Class () { ... }

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

[ 'toString', 'valueOf', 'isPrototypeOf', 'hasOwnProperty' ].map(function (baggage) {
 if (theTruth[baggage]) return baggage;
})
// => []
```

### And what are extensions?

Extensions are an opt-in system (implemented as a [Module](./MODULES.README.md)) for
adding default fields to classes.

For example, if you want all your classes to have a `toString` method:

```js
var Classy$Extensible = require('classy')
  , CX = require('classy/examples/extensions')

var CustomClassy = Classy$Extensible.extend(CX.toString);
```

You can write your own extensions, too:

```js
var Classy$Extensible = require('classy')

var MyClassyExtension = function (self) {

  // add fields or methods or whatever to self here!

}

var CustomClassy = Classy$Extensible.extend(MyClassyExtension);
```

By using extensions, Classy doesn't make any assumptions about what you do or don't want
  in your classes. This gives you the freedom to make your class objects as lightweight
  or as complex as you want!

**Publishing extensions to NPM**: If you want to publish a Classy Extension to NPM,
  make sure to add the keyword `classy-extension` to your package.json before publishing.

## Usage

Using Classy looks like this:

```js
Classy([nArgs], function selfFunction (self, [constructorArgs]) {
  // class body ...
})
```

where `selfFunction` is the constructor for the class. `selfFunction`'s first argument is always `self`: the class instance. (Think of `self` as a non-contextual replacement for `this`.) Additional arguments to `selfFunction` refer to arguments passed in to the constructor.

Classy has two usage methods, and their separation is purely for the sake of optimization. They are *variadic* and *simple* (meaning *with* and *without* arguments).

As the name implies, *simple* is faster than *variadic*. But *variadic* is also faster for 3 or fewer arguments than it is with 4 or more.

(`Classy$Class$Variadic` could be optimized for higher numbers of arguments, but most of the time if you think you need more than 3 arguments you actually need more than 1 function. :wink:)

Classy is also *extensible*. This means you can create new instances of Classy that add default fields and methods to `self` - look at the usage examples for a better overview.

Classy comes with a small number of example extensions; you can find those in [examples/extensions](./examples/extensions). Go ahead, look at the code! They're simple enough they don't need explaining.

### Examples
#### Simple Classy

```js
var aClass = Classy(function (self) {
 self.a = 5
 self.b = '7'
 self.c = self.a + +self.b
})
// => Classy$Class () { ... }

var a = aClass();
// => { a: 5, b: '7', c: 12 }
```

#### Variadic Classy
#### (AKA Classy with Arguments)

```js
// Passing in the number of args is an optimization
var ProperName = Classy(2, function (self, title, name) {
  self.title = title
  self.name  = name
  self.proper = function () {
    return [ self.title, self.name ].join(' ')
  }
  self.greet = function (anotherProperName) {
    return 'Why, hello ' + anotherProperName.proper() + '!'
  }
}) // => Classy$Class () { ... }

var MrFrederick = ProperName('Mr.', 'Frederick')
// => { title: 'Mr.', name: 'Frederick', proper: fn, greet: fn }
var MsJones     = ProperName('Ms.', 'Jones')
// => { title: 'Ms.', name: 'Jones', proper: fn, greet: fn }

MrFrederick.proper()
// => 'Mr. Frederick'

MrFrederick.greet(MsJones)
// => 'Why, hello Ms. Jones!'

MrFrederick.title = 'Baron von'
MsJones.greet(MrFrederick)
// => 'Why, hello Baron von Frederick!'
```

#### Classy Extensions

```js
// Let's make a new Classy Constructor that extends our default `self`
var Library = Classy.extend(function (self) {

  self.books = []

  self.addBook = function (book) {
    self.books.push(book)
  }

})
// => Classy$Extended (nArgs, constructor) { ... }

// Now we can create various types of Library classes.
var LendingLibrary = Library(function (self) {

  self.checkoutBook = function (borrower, title) {
    var book;

    self.books.forEach(function (b) {
      if (b.title == title) book = b;
    })

    if (book) {
      book.available = false;
      book.checkedOutTo = borrower;
      return book;
    }
  }

})
// => Classy$Class$Extended () { ... }

var PrivateLibrary = Library(1, function (self, owner) {

  self.owner = owner;

})
// => Classy$Class$Extended () { ... }

// And now you can just... use 'em!
var aPublicLibrary = LendingLibrary();
// => { books: [] }

aPublicLibray.addBook({
  title: 'Calculus n Stuff',
  author: 'Isaac Newton'
});
// => undefined

var johnsLibrary = PrivateLibrary('John');
// => { books: [], owner: 'John' }

var CalculusNStuff = aPublicLibrary.checkoutBook('John', 'Calculus n Stuff');
// => { title: 'Calculus n Stuff', author ... }

// Oh no! John is stealing a book from the public library... Bad John.
johnsLibrary.addBook(CalculusNStuff);
// => undefined

```

## Results & Constraints:

* You don't have to use the `new` keyword. In fact, don't.
    * **Why?** The point of `new` is to create a new object for `this`, and then
      to populate it with the Function prototype and call your constructor on it.
      Since Classy does not use `this`, `new` just adds pointless overhead.
      Besides, it's cleaner this way. Follow a convention like Title-Casing
      class names instead. (That said, it does work to use `new`, if you insist.)

* You cannot use `instanceof` on Classy Classes.
    * **Why?** They have no prototype. `instanceof` isn't so great anyway. That said,
      a Classy Class Module could be written to provide this functionality. Actually,
      I went ahead and [wrote one](./src/classy/modules/class/is-instance.js).

* Classy creates an optimized `Classy$Class` constructor for 0, 1, 2, or 3 argument
    classes. Classes with more than 3 arguments will result in a `Classy$Class$Variadic`
    instead of a fixed-argument `Classy$Class`, and performance falls off due
    to an additional call to `Function.apply`.

### Get Classy!
