// NOTE(jordan): this may be the worst thing ever
// What a goofy situation: abusing mutation to enable
//   something functional...
// Meet JS: we have Fn apply, but it's so slow you
//   should avoid it at all costs.
eff = module.exports

// NOTE(jordan): chain recursively
// EFFICIENCY: 2(n-1) `apply`s, when n>2
// compose2(compose2(a, b), compose2(c, d))
// --> apply compose2_1, apply compose2_2
// --> apply a, apply b, apply c, apply d
// 4 args, 6 `apply`s
eff.compose2 = function (a, b) {
  return function () {
    a.apply(null, arguments)
    b.apply(null, arguments)
  }
}

// NOTE(jordan): chain as ordered array
// EFFICIENCY: n `apply`s
eff.composeArray = function (fns) {
  return function () {
    [].forEach.call(fns, function (fn) {
      fn.apply(null, arguments)
    })
  }
}

// NOTE(jordan): chain as ordered arguments
// EFFICIENCY: same as composeArray
eff.compose = function () {
  return eff.composeArray(arguments)
}

// NOTE(jordan): chain as ordered array
// ONLY APPLY certain fns (usecase: modules.compose)
// EFFICIENCY: n-1 `apply`s, n fn calls
eff.composeApplyLast = function (fns) {
  var lastFn = fns.length - 1

  return function (self) {
    var args = arguments

    ([]).forEach.call(fns, function (fn, i) {
      if (i == lastFn)
        fn.apply(null, args)
      else
        fn(self)
    })
  }
}

// NOTE(jordan): apply a bunch of fns to args
// EFFICIENCY: n `apply`s, n+1 fn calls (1 from applyOn)
eff.applyEach = function (fns, args) {
  function applyOn (args) {
    return function apply (fn) {
      fn.apply(null, args)
    }
  }

  fns.forEach(applyOn(args))
}

// NOTE(jordan): call a bunch of fns oon target
// EFFICIENCY: n+1 fn calls (1 from callOn)
eff.callEach = function (fns, target) {
  function callOn (target) {
    return function call (fn) {
      fn(target)
    }
  }

  fns.forEach(callOn(target))
}
