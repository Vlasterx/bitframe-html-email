'use strict';

const gulp = require('gulp');
const htmlbeautify = require('gulp-html-beautify');
const panini = require('panini');
const inlineCss = require('gulp-inline-css');
const inlineimg = require('gulp-inline-image-html');
const plumberNotifier = require('gulp-plumber-notifier');
const runSequence = require('run-sequence').use(gulp);

// Paths
const appPaths = require('../paths.js');

gulp.task('createHtml', function() {
  const htmlOptions = {
    'indent_size': 2,
    'indent_char': ' ',
    'eol': '\n',
    'indent_level': 0,
    'indent_with_tabs': false,
    'preserve_newlines': true,
    'max_preserve_newlines': 10,
    'jslint_happy': true,
    'space_after_anon_function': false,
    'brace_style': 'collapse',
    'keep_array_indentation': false,
    'keep_function_indentation': false,
    'space_before_conditional': true,
    'break_chained_methods': false,
    'eval_code': false,
    'unescape_strings': false,
    'wrap_line_length': 144,
    'wrap_attributes': 'auto',
    'wrap_attributes_indent_size': 2,
    'end_with_newline': false
  };

  panini.refresh(); // Panini Watch needs to reset Panini and then build a new one

  return gulp.src(appPaths.htmlBuildIn + 'messages/**/*.{html,hbs,handlebars}')
    .pipe(plumberNotifier())
    .pipe(panini({
      root: appPaths.htmlBuildIn + 'messages/',
      layouts: appPaths.htmlBuildIn + 'layouts/',
      partials: appPaths.htmlBuildIn + 'partials/',
      helpers: appPaths.htmlBuildIn + 'helpers/',
      data: appPaths.htmlBuildIn + 'data/'
    }))
    .pipe(htmlbeautify(htmlOptions))
    .pipe(gulp.dest(appPaths.htmlBuildOut));

});


// Inline HTML files and create usable HTML email templates 
gulp.task('inlineCss', function () {
  return gulp.src(appPaths.htmlInlineIn)
    .pipe(plumberNotifier())
    .pipe(inlineCss({
      applyStyleTags: true,
      applyLinkTags: true,
      removeStyleTags: false,
      removeLinkTags: true,
      preserveMediaQueries: true,
      applyWidthAttributes: true,
      applyTableAttributes: true,
      removeHtmlSelectors: true
    }))
    .pipe(inlineimg(appPaths.htmlBuildIn))
    .pipe(gulp.dest(appPaths.htmlInlineOut));
});

gulp.task('createHtmlEmail', function() {
  runSequence(
    'createHtml', 'inlineCss'
  );
});