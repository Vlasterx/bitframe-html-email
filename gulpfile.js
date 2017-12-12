'use strict';

// Plugins
const gulp = require('gulp');
const clc = require('cli-color');
const requireDir = require('require-dir');
const runSequence = require('run-sequence').use(gulp);

// Paths
const appPaths = require('./gulp/paths.js');

// Project information
const appPkg = require('./package.json');

// Require all tasks
requireDir('./gulp/tasks', { recurse: true });

// Colored log messages
const red = clc.red.bold;
const yellow = clc.yellow;
const blue = clc.blue;
const blue2 = clc.blue.bold;
const green = clc.green;
const cyan = clc.cyan;

// Done message
gulp.task('done', function() {
  console.log(green('\n\n------------------------------------------------------------------------'));
  console.log(yellow(appPkg.name + ' ' + appPkg.version) + green(' build process is complete! \n'));
  console.log(blue('> Author:       ') + red(appPkg.author.name + ' <' + appPkg.author.email + '>'));
  console.log(blue('> Author url:   ') + blue2(appPkg.author.url));
  console.log(blue('> Project url:  ') + blue2(appPkg.homepage));
  console.log(green('------------------------------------------------------------------------\n\n'));
});



// Default task
// ------------
gulp.task('default', function () {
  runSequence(
    // Initial cleanup
    'clean',
    // SCSS
    'scss',
    // Build HTML
    'createHtml', 'inlineCss',
    // Done
    'done'
  );
});



// Watch task
// ----------
gulp.task('watching', function () {
  runSequence(
    // SCSS
    'scss',
    // Build HTML
    'createHtml', 'inlineCss',
  );
});

gulp.task('watch', ['watching'], function () {
  // Watch Styles
  gulp.watch(appPaths.scssWatch, ['scss'])
    .on('change', function (event) {
      console.log(yellow(`[${event.type}] ${event.path}`));
    });
  gulp.watch(appPaths.cssWatch, ['createHtmlEmail'])
    .on('change', function(event) {
      console.log(yellow(`[${event.type}] ${event.path}`));
    });
    
  // Watch HTML elements
  gulp.watch(appPaths.htmlBuildWatch, ['createHtmlEmail'])
    .on('all', function (event) {
      console.log(blue(`[${event.type}] ${event.path}`));
    });
});
