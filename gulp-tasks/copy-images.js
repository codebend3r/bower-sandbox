'use strict';

module.exports = function (gulp, plugins, config, gutil) {

  return function () {

    return gulp.src(['app/fonts/**/*'])
      .pipe(gulp.dest(config.buildFolder + '/fonts'))
      .on('error', gutil.log);

  };

};
