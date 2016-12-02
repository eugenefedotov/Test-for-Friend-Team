"use strict";

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    csso = require('gulp-csso'),
    prefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat');

gulp.task('styles', function() {
  return gulp.src([
    'path to css files'
  ])
    .pipe(concat('styles.css'))
    .pipe(prefixer('last 1 version', '> 1%', 'ie 8', 'ie 7'))
    .pipe(csso())
    .pipe(gulp.dest('path to directory'));
});

gulp.task('js', function() {
  gulp.src([
    'path to js files'
  ])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('path to directory'))
});

gulp.task('watch', function () {
  gulp.watch('path to css files', ['styles']);
  gulp.watch('path to js files', ['js']);
});