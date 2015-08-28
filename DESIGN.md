#Classy Design Doc

Here lie the ramblings of a man obsessed with killing `this`.

##Overview

Classy has two top-level components:

 * **Selfish**: a self-syntax wrapper
 * **Classy**: Classy core

### Selfish
--------------------------------------------------------------------------------

Selfish provides the self-syntax construction of Classy. An early version of what would become Selfish looked like this:

```js
var thing = (function (self) {

  self.field = 'value';

  return self;

})(Object.create(null))

```
Selfish is now split into two modules that clean up the syntax, removing the need for a return statement and passing in a bare object from `Object.create(null)` automatically:

 * Selfish/**Simple** an optimized self-syntax wrapper that does not accept arguments
 * Selfish/**Variadic** a generalized wrapper that takes arguments, but is slower

#### Usage

```js
var thingMaker = SelfishSimple(function (self) {
  self.field = 'value';
})

var thing = thingMaker();
// => { field: 'value' }

var thingMaker = SelfishVariadic(function (self, value) {
  self.field = value;
})

var thing = thingMaker('value');
// => { field: 'value' }
```

### Classy
--------------------------------------------------------------------------------

This is the meaty part. All the core parts of Classy are implemented here.

It's broken up into two concepts and four components:

 * Classy/**base** (AKA **Classy$Base**): the most minimal implementation of Classy
 * Classy/**class** (AKA **Classy$Class**): an optimization wrapper around Selfish
 * Classy/**module**: the Classy module system
 * Classy/**modules**: Classy's included modules
   * **core**: modules that build upon Classy$Base
     * **extensible**: provides Classy.extend
   * **class**: modules that build upon Classy$Class
     * **generates-model**: adds a reference model of fields/values to Classy$Classes

#### Classy$Base

Classy$Base is little more than a wrapper around Classy$Class. It takes two arguments, `nArgs` and `constructor`, and after fiddling with them to allow making `nArgs` optional, it passes them directly into Classy$Class and returns the result.

Classy$Base can be upgraded with trivial effort by creating a Classy Core Module with `Classy$Module.$Core`. In fact, this is how Classy$Extensible works.

#### Classy$Class$Constructor

Classy$Class$Constructor is an optimized Switch-Case statement that, based on the number of arguments declared by `nArgs`, returns a `function Classy$Class` with a pre-baked number of arguments. It only pre-bakes up to 3 arguments, so Classy$Classes taking 4 arguments or more are not optimized.

#### Classy$Module

Classy$Module is an abstraction for the creation of Classy Modules, which are the fundamental building blocks of Classy. There are two types of Classy Modules:

  * **Core Modules (Classy$Module$Core)** for creating an extended Classy that can add new features on top of Classy$Base, like Classy.extend.
  * **Class Modules (Classy$Module$Class)** for creating an extended Classy that performs operations post-instantiation to extend Classy$Class objects.

Modules should be fairly performant, and all Module performance costs should be one-time. Once the Classy$Class has been created, all the Modules used by Classy have already been executed and will never be executed again.

Modules will obviously increase the space taken up by Classy and by Classy$Class objects, but won't affect the size of Classy$Class instances.

#### Classy$Extensible

A Classy Module providing the Classy Extension System, which lets you add default methods and fields to Classy$Class instances.

#### Classy$Class$GeneratesModel

A Classy Class Module that creates a reference model of a Classy$Class instance and adds it to the Classy$Class object. This can be used for things like instance-checking! (In fact, it is most valuable as used by Classy$Class$WithIsInstance.)

HOWEVER, it does so by creating a reference instance and not passing any argument values. This is possibly expensive? It certainly isn't something I would expect to be naturally speedy.
