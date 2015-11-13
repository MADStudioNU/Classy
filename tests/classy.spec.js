/* global jasmine, describe, it, expect */

var Classy     = require('..')
  , IsInstance = require('../core/is-instance')
  , Compose    = require('../core/compose')

describe('Classy', function () {
  var c = Classy(function (self) {})

  it('Can create a new ClassyClass (shorthand)', function () {
    expect(c).toBeDefined()
    expect(c).toEqual(jasmine.any(Function))
  })

  it('Creates bare objects by default', function () {
    expect(c()).toEqual(Object.create(null))
  })

  it('Does not create singletons', function () {
    expect(c()).not.toBe(c())
  })

  it('Creates customizable class-mediums', function () {
    var AMedium = Classy().use(IsInstance)

    var AThing = AMedium
      .define(function (self) {
        self.a = 'a'
      })

    var athing = Object.create(null)
    athing.a = 'a'

    expect(AThing()).toEqual(athing)
    expect(AThing.isInstance).toEqual(jasmine.any(Function))
    expect(AThing.isInstance(athing)).toBe(true)
    expect(AThing.isInstance({ a: 'a' })).toBe(true)
  })

  it('Creates customizable class-definitions', function () {
    var Medium = Classy().use(IsInstance)

    var Animal = Medium
                   .define(function (animal, type) {
                     animal.type = type
                   })

    var Dog = Medium
                .define(function (dog, name) {
                  dog.name = name
                })
                .use(Compose(Animal, 'Dog'))

    var doug  = Object.create(null)
    doug.name = 'Doug'
    doug.type = 'Dog'

    expect(Dog('Doug')).toEqual(doug)
    expect(Dog.isInstance(doug)).toBe(true)
    expect(Animal.isInstance(Dog('Doug'))).toBe(true)
    expect(Animal.isInstance(doug)).toBe(true)
  })
})
