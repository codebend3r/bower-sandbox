'use strict';

module.exports = function (gulp, plugins, config, gutil) {

  return function () {

    return gulp.src([config.bowerPath + '/**/*'])
      .pipe(gulp.dest(config.buildFolder + '/bower_components'))
      .on('error', gutil.log);

  };

};
