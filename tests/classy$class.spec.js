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
