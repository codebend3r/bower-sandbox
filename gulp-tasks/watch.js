'use strict';

module.exports = function (gulp, plugins, config, gutil) {

  /**
   * watches files for changes - will watch for: .html, .scss, .js and json etc.
   */
  return function () {

    // watch all .html files
    gulp.watch([
      config.app + '/index.html',
      config.app + '/views/**/*.html',
      config.app + '/local-views/**/*.html',
      config.app + '/branded/**/*.html'
    ], ['browser-reload']);

    // watch .scss files
    gulp.watch(
      [config.scssPath + '/**/*.scss', 'app/local-scss/*.scss'], ['browser-reload']
    );

    // watch browserify files
    gulp.watch(
      [config.browserifyPath + 'in/**/*.js'], ['browser-reload']
    );

    // watch .js files
    gulp.watch([
      config.app + '/js/**/*.js',
      config.app + '/local-js/**/*.js',
      config.app + '/ute-vendor/**/*.js',
      '!app/local-js/cache/templateCache.js',
      '!app/local-js/cache/templateCacheCore.js'
    ], ['browser-reload']);

    // watch image files
    gulp.watch(
      [config.imgPath + '/**/*.{png,jpg,jpeg,svg,gif}'], ['browser-reload']
    );

    gulp.watch(
      [config.jsonPath + '/**/*.json'], ['browser-reload']
    );

  };

};
