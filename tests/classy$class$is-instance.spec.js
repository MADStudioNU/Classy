describe('Classy$Class$IsInstance', function () {
  var customClassy, Animal

  beforeAll(function () {
    customClassy = Module$IsInstance.module(Classy);
    Animal = customClassy(1, function (self, type) {
      self.type = type;
      self.kingdom = 'Animal';
    })
  })

  it('returns true for all matching objects', function () {
    expect(Animal.isInstance(Animal('dog'))).toEqual(true);
    expect(Animal.isInstance({ type: 'dog', kingdom: 'Animal' })).toEqual(true);
    expect(Animal.isInstance({ type: 'dog', name: 'Fido', kingdom: 'Animal' })).toEqual(true);
    var dog = Object.create(null);
    dog.type = 'dog';
    dog.kingdom = 'Animal';
    expect(Animal.isInstance(dog)).toEqual(true);
    dog.name = 'Fido';
    expect(Animal.isInstance(dog)).toEqual(true);
  })

  it('returns false for inexact matches when used with strict=true', function () {
    expect(Animal.isInstance({ type: 'dog', kingdom: 'Animal' }, true)).toEqual(false);
    var dog = Object.create(null);
    dog.type = 'dog';
    dog.name = 'Doug';
    dog.kingdom = 'Animal';
    expect(Animal.isInstance(dog, true)).toEqual(false);
  })

  it('works with extensions', function () {
  })
})
