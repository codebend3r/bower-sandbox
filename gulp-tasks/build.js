'use strict';

module.exports = function (gulp, plugins, config, gutil) {

  var runSequence = require('run-sequence');

  /**
   * builds, watches and serves files
   */
  return function (callback) {
    return runSequence(
      'browser-sync',
      callback);
  };

};
