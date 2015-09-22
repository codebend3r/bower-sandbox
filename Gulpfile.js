'use strict';

var gulp = require('gulp-help')(require('gulp')),
  gutil = require('gulp-util'),
  plugins = require('gulp-load-plugins')(),
  config = require('./gulp.config'),
  _ = require('underscore');

/**
 * dynamically requires a gulp task
 * @param task
 * @returns {*}
 */
var getTask = function (task) {
  return require('./gulp-tasks/' + task)(gulp, plugins, config, gutil);
};

/**
 * loop through external gulp names (config.externalGulpTasks)
 */
_.each(config.externalGulpTasks, function (task) {
  // defines a new task in a loop
  if (task.dependencies && task.dependencies.length > 0) {
    gulp.task(task.name, task.description, task.dependencies, getTask(task.name));
  } else {
    gulp.task(task.name, task.description, getTask(task.name));
  }
});

module.exports = gulp;
