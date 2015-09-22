'use strict';

module.exports = function (gulp, plugins, config, gutil) {

  /**
   * Serves /build folder
   */
  return function () {

    var browserSync = require('browser-sync');

    return browserSync.create().init({
      open: gutil.env.open === 'true',
      port: config.port,
      server: {
        baseDir: config.buildFolder
      }
    });
  };

};