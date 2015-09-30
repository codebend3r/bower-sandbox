'use strict';

module.exports = function (gulp, plugins, config, gutil) {

  return function () {

    var csso = require('gulp-csso');
    var rev = require('gulp-rev');
    var uglify = require('gulp-uglify');
    var ngAnnotate = require('gulp-ng-annotate');

    return gulp.src(['app/index-2.html'])
      //.pipe(plugins.rename('index.html'))
      .pipe(plugins.usemin({
        css: [
          //csso(),
          //rev()
        ],
        js: [
          //ngAnnotate(),
          //uglify(),
          //rev()
        ]
      }))
      .pipe(gulp.dest(config.buildFolder))
      .pipe(plugins.size());

  };

};
