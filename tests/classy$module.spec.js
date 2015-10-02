describe('Classy.Module', function () {
  var Classy$Class$TestModule, Classy$TestModule;

  beforeAll(function () {
    Classy$Class$TestModule = Classy.Module.$Class(function (classyClass) {
      classyClass.test = function () { return true; }
    })

    Classy$TestModule = Classy.Module.$Core(function (classy) {
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

  it('can have multiple modules', function () {
    var customClassy = Classy$TestModule(Classy$Class$TestModule(Classy))

    expect(customClassy).toEqual(jasmine.any(Function))
    expect(customClassy.test).toEqual(jasmine.any(Function))
    expect(customClassy.test()).toEqual(true)

    var customClassyClass = customClassy(function () { });

    expect(customClassyClass.test).toEqual(jasmine.any(Function))
    expect(customClassyClass.test()).toEqual(true)
  })

  it('can have multiple modules in any order', function () {
    var customClassy = Classy$Class$TestModule(Classy$TestModule(Classy))

    expect(customClassy).toEqual(jasmine.any(Function))
    expect(customClassy.test).toEqual(jasmine.any(Function))
    expect(customClassy.test()).toEqual(true)

    var customClassyClass = customClassy(function () { });

    expect(customClassyClass.test).toEqual(jasmine.any(Function))
    expect(customClassyClass.test()).toEqual(true)
  })
})
