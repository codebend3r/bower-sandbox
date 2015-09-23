'use strict';

module.exports = function (gulp, plugins, config, gutil) {

  var runSequence = require('run-sequence');

  gutil.log(gutil.colors.cyan('------------------'));
  gutil.log(gutil.colors.cyan('build-gui'));
  gutil.log(gutil.colors.cyan('------------------'));

  /**
   * builds, watches and serves files
   */
  return function (callback) {
    return runSequence(
      'copy-index',
      'copy-js',
      'copy-bower',
      callback);
  };

};
