'use strict';

module.exports = function (gulp, plugins, config, gutil) {

  return function () {

    return gulp.src([
        config.app + '/index.html'
        //config.app + '/index-packaged.html'
        //config.app + '/index-absolute.html'
      ])
      .pipe(plugins.rename('index.html'))
      .pipe(gulp.dest(config.buildFolder))
      .on('error', gutil.log);

  };

};
