/**
 * Created by sp-admin on 4/11/2015.
 */
var gulp = require('gulp');
var scopeCss = require("gulp-scope-css");
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var concatCss = require('gulp-concat-css');
var runSequence = require('gulp-run-sequence');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var del = require('gulp-rimraf');
var bundle = require('gulp-bundle-assets');

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

gulp.task('xScope', function () {
    gulp.src(['./bower_components/x-editable/dist/bootstrap3-editable/css/bootstrap-editable.css'])
        .pipe(scopeCss('.bsScope'))
        .pipe(replace(' html', '.html-bs'))
        .pipe(replace(' body', '.body-bs'))
        .pipe(rename(function (path) {
            path.basename += '-scoped'
        }))
        .pipe(gulp.dest('./bower_components/x-editable/dist/bootstrap3-editable/css/'));
});

var vendorDist = [
    './bower_components/jquery/dist/**/*.*',
    './bower_components/bootstrap/dist/**/*.*',
    './bower_components/select2/dist/**/*.*',
    './bower_components/select2-bootstrap/_jekyll/css/select2-bootstrap.css',
    './bower_components/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css',
    './bower_components/bootstrap-switch/dist/js/bootstrap-switch.min.js',
    './bower_components/moment/min/moment-with-locales.min.js',
    './bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
    './bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
    './bower_components/lodash/lodash.min.js',
    './bower_components/x-editable/dist/bootstrap3-editable/js/bootstrap-editable.min.js',
    './bower_components/x-editable/dist/bootstrap3-editable/css/bootstrap-editable-scoped.css'
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
        .pipe(gulp.dest('./dist/spBsCtrls.css'));
});

gulp.task('buildJs', function (cb) {
    return gulp.src(['./src/js/ns.js', './src/js/**/*.js'])
        .pipe(concat('spBsCtrls.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('m', function () {
    runSequence('buildCss', 'buildJs', 'buildJs', 'sp');
});

gulp.task('build', function () {
    runSequence('bsScope', 'xScope', 'move', 'buildCss', 'buildJs', 'sp');
});

gulp.task('watch', function () {
    return watch(['./src/js/**/*.js', './src/style/**/*.css'], function () {
        runSequence('m', 'm');
    });
});

gulp.task('clean', function () {
    return gulp.src(['C:\\Program Files\\Common Files\\microsoft shared\\Web Server Extensions\\15\\TEMPLATE\\LAYOUTS\\spBs', './dist/'], {read: false})
    pipe(del());
})

gulp.task('bundle', function () {
    return gulp.src('./bundle.config.js')
        .pipe(bundle())
        .pipe(gulp.dest('./build'))
})

gulp.task('default', ['build', 'build']);

