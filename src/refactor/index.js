var Selfish             = require('../selfish')
  , modules             = require('./modules')
  , ClassyClassOrMedium = require('./class')

var mods = Object.create(null)

function ClassyFactory () {

  return ClassyClassOrMedium

}

function classyDef (classy) {
  classy.mod = function (classyModules) {

    if (!(classyModules instanceof Array))
      classyModules = [ classyModules ]

    var newClassy = Selfish.simple(classyDef, ClassyFactory())
    modules.call(newClassy, classyModules)
    return newClassy
  }
}

Classy = Selfish.simple(classyDef, ClassyFactory())

module.exports = Classy
