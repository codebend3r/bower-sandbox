'use strict';

module.exports = function () {

  var del = require('del');

  return function (cb) {
    return del(['builds'], cb);
  };

};