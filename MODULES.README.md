#Modules

So... what the heck are modules? And how are they different from Extensions?

### First of all

Extensions are a module. They're a Classy Core Module. Let's talk about that.

### Types of Modules

There are 2 types of module.

1. Core
2. Class

**Core** modules add to the default Classy object and return a new one. For instance,
Classy.extend is provided by the Classy$Extensible core module.

**Class** modules modify the ClassyClass constructor that is created when you use Classy.
Classy$Class$IsInstance (the instanceOf replacement module) is a Classy Class Module.

### Why?

Sometimes you want to add a feature at the level of Classy itself - like Classy.extend -
and sometimes you want to add a feature to the Class Classy creates - like the ability to
check whether an arbitrary object is an instance of the Class.

I anticipate that Core Modules don't have many use cases that can't be implemented as a
Class Module, but Extensions are a clear exception. So both exist.

Essentially, it can be summed up like this: Modules add features to the "meta" objects in Classy. The Classy object itself, and the Class Constructors it produces.

(As a side note, I mentioned that Extensions is a Core Module. Extensions can be thought
of as a way to add Abstract Classes to Classy Class objects; they're a way of defining
fields that will exist on every *instance* of a ClassyClass.)

## Usage Notes
### Modules don't Mutate Classy$Base

Modules maintain (some) immutability. While there's no easy way to prevent the modifying of
a Classy or a Classy Class directly (just using JavaScript), it is true that adding a
Module never modifies an existing Classy - it will always return a new one. For example:

```js
var Classy = require('classy')
  , Classy$IsInstance = require('classy/modules/is-instance.js')

var ClassyWithIsInstance = Classy$IsInstance(Classy)

ClassyWithIsInstance === Classy // => false

var class1 = Classy();
var class2 = ClassyWithIsInstance();

class1.isInstance // => undefined
class2.isInstance // => function () {...}
```

### I want to do introspection!

Then you'll need to make a module, and you'll probably want to depend on
Classy$Class$GeneratesModel (or some variation of it).

This is a (very) basic module for keeping track of what fields and values exist by default
in a ClassyClass instance. [Check it out to see what I mean](./src/classy/modules/class/generates-model.js).

It provides a couple fields to ClassyClass:

```js
var Classy$GeneratesModel = require('classy/modules/class/generates-model.js')
  , Classy = Classy$GeneratesModel(require('classy'));

var Animal = Classy(2, function (self, type, breed) {
  self.type = type;
  self.breed = breed;
  self.toString = function () {
    self.type + ' of breed ' + self.breed;
  }
});

Animal.fields // => [ 'type',    'breed',    'toString' ]
Animal.values // => [ NoDefault,  NoDefault,  function () { ... } ]
Animal.model  // => { type: NoDefault, breed: NoDefault, toString: function () {...} }

```

#### WTH is NoDefault?

It's a thunk that returns itself. You can get access to it as a field of
Classy$Class$GeneratesModel.

```js
Classy$Class$GeneratesModel.NoDefault() // => NoDefault
```

#### Okay, so why?

NoDefault isn't the same as NaN or undefined or null. While a field that has the value
NoDefault could very well initialize to any of those things in practice (or even the empty
string, because JavaScript), it has its own semantic meaning: it means that there isn't a
default value for that field.

Unless the field is set in the constructor, or otherwise populated during instantiation,
that field will probably be undefined - or otherwise some falsy value - and so it can't
reliably be used to model what a Class should look like, which is the point of this
extension. Hence, NoDefault.

It does, however, make it convenient to check whether a value has NoDefault: you can just
use instanceOf to test values in ClassyClass.model. So, if you wanted to, say, write a
module that enforced that a default value has to be specified for every field in a class,
you could do that using NoDefault and Classy$Class$GeneratesModel.

### Examples

For examples, check out [Classy's built-in modules](./src/classy/modules).

### Built-Ins

There's only one built-in module, although there are a few that ship with Classy.

The only built-in module is Classy$Extensible, the Classy Core Module that provides
`Classy.extend`. Even that can be done away with, however, if you require Classy$Base
instead of requiring Classy directly. (I.e.; `var Classy = require('classy/base');`)

The modules that ship with Classy are modules that seem like common use cases. They are
Classy$Class$GeneratesModel and Classy$Class$IsInstance, both of which are required to
provide instanceOf-like functionality to Classy Classes. But Classy is not, by default,
equipped with those modules.
