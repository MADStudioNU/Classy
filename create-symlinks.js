var fs = require('fs')

var c  = '../src/classy'
  , s  = '../src/selfish'
  , cd = 'node_modules/classy'
  , sd = 'node_modules/selfish'
  , e  = undefined

e = fs.existsSync(cd);
if (!e) {
  console.log('link', cd, 'to', c)
  fs.symlinkSync(c, cd, 'dir')
}

e = fs.existsSync(sd)
if (!e) {
  console.log('link', sd, 'to', s)
  fs.symlinkSync(s, sd, 'dir')
}

