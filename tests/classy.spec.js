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
