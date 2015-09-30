describe('Classy', function () {
  var c = Classy(function (self) {});;

  it('Can create a new ClassyClass', function () {
    expect(c).toBeDefined();
    expect(c).toEqual(jasmine.any(Function));
    expect(c()).toEqual(Object.create(null));
  })

  it('Does not create singletons', function () {
    expect(c()).not.toBe(c());
  })
})

describe('Simple ClassyClass', function () {

  var c, example

  beforeAll(function () {
    c = Classy(function (self) {
      self.a = 7;
      self.b = '5';
      self.c = self.a + +self.b;
    })

    example = c();
  });

  it('Works with no arguments', function () {
    expect(example.a).toEqual(7)
    expect(example.b).toEqual('5')
    expect(example.c).toEqual(12)

    for (var field in example) {
      field == 'a' || field == 'b' || field == 'c' || fail('Unexpected field');
    }
  })

  it('Works with multiple arguments', function () {
    var animal = Classy(1, function (self, type) {
      self.type = type;
    })

    expect(animal).toEqual(jasmine.any(Function))

    var dog = animal('dog');

    expect(dog.type).toEqual('dog')

    for (var field in dog) {
      expect(field).toEqual('type')
    }
  })
})

describe('Classy$Module', function () {
  var Classy$Class$TestModule, Classy$TestModule;

  beforeAll(function () {
    Classy$Class$TestModule = Classy$Module.$Class(function (classyClass) {
      classyClass.test = function () { return true; }
    })

    Classy$TestModule = Classy$Module.$Core(function (classy) {
      classy.test = function () { return true; }
    })
  })

  it('can create a core module', function () {
    var customClassy = Classy$TestModule(Classy);

    expect(customClassy).toEqual(jasmine.any(Function))
    expect(customClassy.test).toEqual(jasmine.any(Function))
    expect(customClassy.test()).toEqual(true)
  })

  it('can create a class module', function () {
    var customClassy = Classy$Class$TestModule(Classy);

    expect(customClassy).toEqual(jasmine.any(Function))

    var customClassyClass = customClassy(function (self) {});

    expect(customClassyClass.test).toEqual(jasmine.any(Function))
    expect(customClassyClass.test()).toEqual(true)
  })
})

describe('Classy#extend', function () {
  it('creates custom Classy instances', function () {
    var Animal = Classy.extend(function (self) {
      self.sayHello = function () {
        return 'Hello, my name is ' + self.name + ' and I am a ' + self.type + '!';
      }
    })

    expect(Animal).toEqual(jasmine.any(Function));

    var Dog = Animal(1, function (self, name) {
      self.type = 'Dog';
      self.name = name;
    })

    expect(Dog).toEqual(jasmine.any(Function));

    var doug = Dog('Doug');

    expect(doug.name).toEqual('Doug')
    expect(doug.type).toEqual('Dog')
    expect(doug.sayHello()).toEqual('Hello, my name is Doug and I am a Dog!')
  })
})

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
