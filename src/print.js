// define([
//   'require',
//   'dependency'
// ], function(require, factory) {
//   'use strict';

// });

// class Main {
//   printMe() {
//     console.log("I get called from print.js!");
//   }
// }
// export default new Main();

let moduleExports = {};

moduleExports.printTest = function () {
  // eslint-disable-next-line no-console
  console.log("I am a test module export");
};

// eslint-disable-next-line no-undef
module.exports = moduleExports;
