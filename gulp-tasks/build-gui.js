'use strict';

module.exports = function (gulp, plugins, config, gutil) {

  var runSequence = require('run-sequence');

  /**
   * builds, watches and serves files
   */
  return function (callback) {

    gutil.log(gutil.colors.white('----------------------------------------'));
    gutil.log(gutil.colors.magenta('build-gui'));
    gutil.log(gutil.colors.white('----------------------------------------'));

    return runSequence(
      'copy-js',
      'copy-bower',
      'copy-cms',
      'copy-fonts',
      'copy-images',
      'copy-index',
      //'build-min-index',
      //'copy-views',
      callback);
  };

};
