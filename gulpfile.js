/**
 * Created by sp-admin on 4/11/2015.
 */
    var gulp = require('gulp');
    var scopeCss = require("gulp-scope-css");
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var concatCss = require('gulp-concat-css');
var webpack = require('gulp-webpack');
var wp = require('webpack');
var BowerWebpackPlugin = require("bower-webpack-plugin");
//var rename = require('gulp-rename');
var path = require('path');
var runSequence = require('gulp-run-sequence');
var concat = require('gulp-concat');

gulp.task('bsScope', function () {
    gulp.src(['./bower_components/bootstrap/dist/**/*.css', '!./bower_components/bootstrap/dist/**/*scoped*.css'])
        .pipe(scopeCss('.bsScope'))
        .pipe(replace(' html', '.html-bs'))
        .pipe(replace(' body', '.body-bs'))
        .pipe(rename(function (path) {
            path.basename += '-scoped'
        }))
        .pipe(gulp.dest('./bower_components/bootstrap/dist/'));
});

gulp.task('fuScope', function () {
    gulp.src(['./bower_components/fuelux/dist/**/*.css', '!./bower_components/fuelux/dist/**/*scoped*.css'])
        .pipe(scopeCss('.bsScope'))
        .pipe(replace(' html', '.html-bs'))
        .pipe(replace(' body', '.body-bs'))
        .pipe(rename(function (path) {
            path.basename += '-scoped'
        }))
        .pipe(gulp.dest('./bower_components/fuelux/dist/'));
});

gulp.task('tokenScope', function () {
    gulp.src(['./bower_components/bootstrap-tokenfield/dist/**/*.css', '!./bower_components/bootstrap-tokenfield/dist/**/*scoped*.css'])
        .pipe(scopeCss('.bsScope'))
        .pipe(replace(' html', '.html-bs'))
        .pipe(replace(' body', '.body-bs'))
        .pipe(rename(function (path) {
            path.basename += '-scoped'
        }))
        .pipe(gulp.dest('./bower_components/fuelux/dist/'));
});

var vendorDist = [
    './bower_components/bootstrap/dist/**/*.*',
    './bower_components/fuelux/dist/**/*.*',
    './bower_components/jquery/dist/**/*.*',
    './bower_components/jquery-ui/jquery-ui.min.js',
    './bower_components/jquery-ui/jquery-ui.min.css',
    './bower_components/bootstrap-tokenfield/dist/**/*.*',
    './bower_components/select2-bootstrap-css/_jekyll/css/select2-bootstrap.css',
    './bower_components/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css',
    './bower_components/bootstrap-switch/dist/js/bootstrap-switch.min.js'
];

gulp.task('move', function () {
    gulp.src(vendorDist) //, {base: './'} to keep folder structure
        .pipe(gulp.dest('./dist/vendor/'));
});

gulp.task('sp',function () {
    return gulp.src('./dist/**/*.*')
        .pipe(gulp.dest('C:\\Program Files\\Common Files\\microsoft shared\\Web Server Extensions\\15\\TEMPLATE\\LAYOUTS\\spBs'));
});

gulp.task('buildCss', function () {
    gulp.src('./src/style/**/*.css')
        .pipe(concatCss(''))
        .pipe(gulp.dest('./dist/bundle.css'));
});

gulp.task('buildJs', function (cb) {
    return gulp.src(['./src/js/ns.js', './src/js/**/*.js'])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('vendor', ['bsScope', 'fuScope', 'move', 'sp']);

gulp.task('watch', function () {
    return gulp.watch(['./src/js/**/*.js'], ['bJs']);
});

gulp.task('bJs', function () {
    runSequence('buildJs', 'sp');
});

