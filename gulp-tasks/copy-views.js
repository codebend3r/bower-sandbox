'use strict';

module.exports = function (gulp, plugins, config, gutil) {

  return function () {

    return gulp.src([
        config.viewsPath + '/**/*.html'
      ])
      .pipe(gulp.dest(config.buildFolder + '/views'))
      .on('error', gutil.log);

  };

};
