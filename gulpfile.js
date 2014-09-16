'use strict';

var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  sass = require('gulp-ruby-sass'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  ngAnnotate = require('gulp-ng-annotate'),
  uglify = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps'),
  bytediff = require('gulp-bytediff'),
  stylish = require('jshint-stylish'),
  minifyCSS = require('gulp-minify-css'),
  deploy = require('gulp-gh-pages'),
  karma = require('gulp-karma'),
  paths = {
    scripts: ['./app/**/*.js', '!./app/**/*Spec.js'],
    jsCompiled: './public/js',
    scss: './app/assets/scss/**/*.scss',
    scssDir: './app/assets/scss',
    css: './public/css',
    templates: ['./app/**/*.html']
  };

require('gulp-help')(gulp);

// Start BrowserSync
gulp.task('browser-sync', false, function () {
  browserSync({
    server: {
      baseDir: './public'
    },
    port: 7080
  });
});

// Compile compass
gulp.task('compass', 'Compiles compass', function () {
  return gulp.src(paths.scss)
    .pipe(sass({
      compass:true
    }))
    // Minify CSS
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.css))
    .pipe(reload({stream:true}));
});

// Run code through jshint
gulp.task('jshint', false, function () {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});


// Copy templates
gulp.task('copy-templates', 'Copies templates and index.html to public folder', function() {
  return gulp.src(paths.templates)
    .pipe(gulp.dest('./public/js/partials'))
    .pipe(reload({stream:true}));
});

// Run jshint first
gulp.task('js', 'Minifies JavaScript files', ['jshint'], function () {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(concat('my-vinyl-collection.min.js', {newLine: ';'}))
    // Annotate before uglify so the code get's min'd properly.
    .pipe(ngAnnotate({
      // true helps add where @ngInject is not used. It infers.
      // Doesn't work with resolve, so we must be explicit there
      add: true
    }))
    .pipe(bytediff.start())
    .pipe(uglify({mangle: true}))
    .pipe(bytediff.stop())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.jsCompiled))
    .pipe(reload({stream:true}));
});

// Rerun the task when a file changes
gulp.task('watch', 'Watches JavaScript and sass files', function() {
  gulp.watch(paths.scripts, ['js']);
  gulp.watch(paths.scss, ['compass']);
  gulp.watch(paths.templates, ['copy-templates']);
});

// Default task
gulp.task('default', 'The default task :-)', ['watch', 'copy-templates', 'compass', 'js', 'browser-sync']);

// Deploy task
gulp.task('deploy', 'Used to deploy the public dir to gh-pages branch', ['js'], function () {
  return gulp.src('./public/**/*')
    .pipe(deploy());
});