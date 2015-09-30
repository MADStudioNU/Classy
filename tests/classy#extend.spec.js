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
