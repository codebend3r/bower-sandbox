'use strict';

module.exports = function (gulp, plugins, config, gutil) {

  /**
   * watches files for changes - will watch for: .html, .scss, .js and json etc.
   */
  return function () {

    // watch all .html files
    gulp.watch([config.app + '/index.html'], ['build-gui']);

    // watch .scss files
    // gulp.watch([config.scssPath + '/**/*.scss'], ['build-gui']);

    // watch .js files
    gulp.watch([config.app + '/js/**/*.js'], ['build-gui']);

    // watch image files
    // gulp.watch([config.imgPath + '/**/*.{png,jpg,jpeg,svg,gif}'], ['build-gui']);

    // watch json
    // gulp.watch([config.jsonPath + '/**/*.json'], ['build-gui']);

  };

};
