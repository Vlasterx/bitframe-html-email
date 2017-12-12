'use strict';

// Paths
module.exports = {
  // Clean DIST folder
  clean: ['public/**/*'],

  // Styles
  scssIn: 'src/styles/**/*.scss',
  scssOut: 'public/regular/css/',
  scssWatch: 'src/styles/**/*.scss',
  cssWatch: 'public/regular/css/**/*.css',

  // HTML generator
  htmlBuildIn: 'src/',
  htmlBuildOut: 'public/regular/',
  htmlBuildWatch: ['src/**/*.html', 'src/data/**/*.yaml', 'src/data/**/*.yml', 'src/**/*.hbs', 'src/**/*.json'],

  // HTML inliner
  htmlInlineIn: 'public/regular/**/*.html',
  htmlInlineOut: 'public/inlined/'
};
