'use strict';

module.exports = function (gulp, plugins, config, gutil) {

  return function () {

    return gulp.src(['app/cms/**/*'])
      .pipe(gulp.dest(config.buildFolder + '/cms'))
      .on('error', gutil.log);

  };

};
