'use strict';

module.exports = function (gulp, plugins, config, gutil) {

  var runSequence = require('run-sequence');

  /**
   * builds, watches and serves files
   */
  return function (callback) {
    return runSequence(
      'clean-build',
      'build-gui',
      'watch',
      'browser-sync',
      callback);
  };

};
