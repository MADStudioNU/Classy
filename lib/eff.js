/* NOTE(jordan): Eff causes effects to support functional operations.
 * I know. It sounds like an oxymoron. Use effects to be functional?
 * IDK. Seeeeeems to work.
 */
var eff = module.exports

/* NOTE(jordan): chain as ordered array
 * ONLY APPLY certain fns (usecase: modules.compose)
 * EFFICIENCY: 1 `apply`, n fn calls
 */
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

eff.isArray = function (a) {
  return a instanceof Array
}

/* NOTE(jordan): call a bunch of fns on target
 * EFFICIENCY: n+1 fn calls (1 from callOn)
 */
eff.callEach = function (target, fns) {
  function callOn (target) {
    return function call (fn) {
      fn(target)
    }
  }

  if (eff.isArray(fns)) {
    fns.forEach(callOn(target))
  }
}

/* NOTE(jordan): add 1 or more els to an array
 * EFFICIENCY: O(n) if more than 1 els
 */
eff.pushEach = function (arr, els) {
  if (eff.isArray(els)) {
    els.forEach(function (el) { arr.push(el) })
  } else {
    arr.push(els)
  }
}
