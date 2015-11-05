var Classy     = require('..')
  , IsInstance = require('../modules/class-is-instance')
  , Compose    = require('../modules/compose')

describe('Classy', function () {
  var c = Classy(function (self) {})

  it('Can create a new ClassyClass', function () {
    expect(c).toBeDefined()
    expect(c).toEqual(jasmine.any(Function))
  })

  it('Creates bare objects by default', function () {
    expect(c()).toEqual(Object.create(null))
  })

  it('Does not create singletons', function () {
    expect(c()).not.toBe(c())
  })

  var cm = Classy()

  it('Creates customizable class-mediums', function () {
    var AThing = cm.use(IsInstance)
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
    var Animal = Classy()
                   .use(IsInstance)
                   .define(function (animal, type) {
                     animal.type = type
                   })

    var Dog = Classy()
                .use(IsInstance)
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
