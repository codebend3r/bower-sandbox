'use strict';

module.exports = function (gulp, plugins, config, gutil) {

  var runSequence = require('run-sequence');

  /**
   * builds, watches and serves files
   */
  return function (callback) {

    gutil.log(gutil.colors.cyan('------------------'));
    gutil.log(gutil.colors.cyan('build-gui'));
    gutil.log(gutil.colors.cyan('------------------'));

    return runSequence(
      'copy-index',
      'copy-js',
      'copy-bower',
      callback);
  };

};
