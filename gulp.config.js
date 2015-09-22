'use strict';

var config = {};
config.coverage = 'coverage';
config.jsdoc = 'jsdoc';
config.buildFolder = 'builds';
config.filename = 'livesite';
config.app = '';
config.jsPath = config.app + '/js';
config.scssPath = config.app + '/scss';
config.cssPath = config.app + '/css';
config.viewsPath = config.app + '/views';
config.jsonPath = config.app + '/resource';
config.imgPath = config.app + '/images';
config.fontsPath = config.app + '/fonts';
config.bowerPath = config.app + '/bower_components';
config.browserifyPath = config.app + '/browserify';

config.dist = 'dist';
config.port = 8888;

config.externalGulpTasks = [
  {
    name: 'browser-sync',
    description: 'runs browser sync and host files locally'
  },
  {
    name: 'build',
    description: ''
  },
  {
    name: 'watch',
    description: 'watch for files to change'
  }
];

module.exports = config;