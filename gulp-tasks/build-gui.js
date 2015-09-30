'use strict';

module.exports = function (gulp, plugins, config, gutil) {

  var runSequence = require('run-sequence');

  /**
   * builds, watches and serves files
   */
  return function (callback) {

    gutil.log(gutil.colors.white('------------------'));
    gutil.log(gutil.colors.magenta('build-gui'));
    gutil.log(gutil.colors.white('------------------'));

    return runSequence(
      'copy-js',
      'copy-bower',
      'copy-index',
      'build-1-file',
      'build-2-files',
      'copy-views',
      callback);
  };

};
