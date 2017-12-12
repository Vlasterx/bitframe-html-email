'use strict';

const gulp = require('gulp')
const del = require('del')

// Paths
const appPaths = require('../paths.js');

// Cleanup
gulp.task('clean', function () {
  return del(appPaths.clean);
});
