'use strict';

module.exports = function (gulp, plugins, config, gutil) {

  return function () {

    return gulp.src([
        config.jsPath + '/**/*.js'
      ])
      .pipe(gulp.dest(config.buildFolder + '/js'))
      .on('error', gutil.log);

  };

};
