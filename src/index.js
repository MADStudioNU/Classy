/* //////////////////////
 * // Get CLASSY ////
 * //////////////
 * ////////////
 * //// /
 * /// /     (
 * || |   .~  )  /\ (  (  \/
 * \\\ \ (_  (_ /  ) )  )  ) .js
 * \\\\ \
 * \\\\\\\\\\\*/

var Classy$Base = require('classy/base')
  , Classy$Extensible = require('classy/modules/core/extensible.js').module

Classy = Classy$Extensible(Classy$Base);
Classy$Module = require('classy/module');
Module$IsInstance = require('classy/modules/class/is-instance.js');
ClassyToString = require('../examples/extensions/toString.js');

module.exports = Classy;
