// NOTE(jordan): this may be the worst thing ever
// What a goofy situation: abusing mutation to enable
//   something functional...
// Meet JS: we have Fn apply, but it's so slow you
//   should avoid it at all costs.
var eff = module.exports

// NOTE(jordan): chain as ordered array
// ONLY APPLY certain fns (usecase: modules.compose)
// EFFICIENCY: 1 `apply`, n fn calls
eff.composeApplyLast = function (fns) {
  var lastFn = fns.length - 1

  return function (self) {
    var args = arguments

    fns.forEach(function (fn, i) {
      if (i === lastFn) {
        fn.apply(null, args)
      } else {
        fn(self)
      }
    })
  }
}

// NOTE(jordan): call a bunch of fns on target
// EFFICIENCY: n+1 fn calls (1 from callOn)
eff.callEach = function (target, fns) {
  function callOn (target) {
    return function call (fn) {
      fn(target)
    }
  }

  if (fns instanceof Array) {
    fns.forEach(callOn(target))
  }
}

// NOTE(jordan): add 1 or more els to an array
// EFFICIENCY: O(n) if more than 1 els
eff.pushEach = function (arr, els) {
  if (els instanceof Array) {
    els.forEach(arr.push.bind(arr))
  } else {
    arr.push(els)
  }
}
