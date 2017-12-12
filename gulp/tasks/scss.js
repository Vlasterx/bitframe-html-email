'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const prefix = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleancss = require('gulp-cleancss');
const cssmin = require('gulp-cssmin');
const plumberNotifier = require('gulp-plumber-notifier');
const header = require('gulp-header');
const timestamp = require('time-stamp');

// Project information
const appPkg = require('../../package.json');

// Paths
const appPaths = require('../paths.js');

// Browsers to target when prefixing CSS.
const COMPATIBILITY = ['>1%', 'last 2 versions'];

// Info banner
const banner = `/*!
*  Built with Bitframe HTML Email builder v<%= pkg.version %>
*  Styles rendered on ${timestamp('DD.MM.YYYY. at HH:mm') + 'h'}
*/
`;



/******************************************************
 * LIBSASS                                            *
 * -------------------------------------------------- *
 * - Converts SCSS to CSS                             *
 * - Adds browser prefixes to CSS                     *
 * - Groups CSS in same media queries                 *
 * - Optimizes and minifies CSS                       *
 ******************************************************/

gulp.task('scss', function () {
  return gulp.src(appPaths.scssIn)
    .pipe(plumberNotifier())
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compact'
    }))
    .pipe(prefix(COMPATIBILITY))
    .pipe(cssmin())
    .pipe(gcmq())
    .pipe(cleancss({
        keepBreaks: true,
        keepSpecialComments: 1,
        debug: true,
        semanticMerging: true
      },
      function (details) {
        console.log(details.name + ': ' + details.stats.originalSize);
        console.log(details.name + ': ' + details.stats.minifiedSize);
      }))
    .pipe(header(banner, { pkg : appPkg } ))
    .pipe(gulp.dest(appPaths.scssOut))
    // .pipe(cssmin())
    // .pipe(rename(function (path) {
    //   path.extname = '.min.css';
    // }))
    .pipe(gulp.dest(appPaths.scssOut));
});
