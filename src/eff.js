// NOTE(jordan): this may be the worst thing ever
// What a goofy situation: abusing mutation to enable
//   something functional...
// Meet JS: we have Fn apply, but it's so slow you
//   should avoid it at all costs.
eff = module.exports

// NOTE(jordan): chain as ordered array
// ONLY APPLY certain fns (usecase: modules.compose)
// EFFICIENCY: 1 `apply`, n fn calls
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
