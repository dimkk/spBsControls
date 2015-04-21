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
var del = require('del');
var bundle = require('gulp-bundle-assets');
var cfg = require('./gulp.config.js');

/**
 * Vendor section
 */
gulp.task('bsScope', function () {
    return gulp.src(['./bower_components/bootstrap/dist/**/*.css', '!./bower_components/bootstrap/dist/**/*scoped*.css'])
        .pipe(scopeCss('.bsScope'))
        .pipe(replace(' html', '.html-bs'))
        .pipe(replace(' body', '.body-bs'))
        .pipe(replace('url(\'../fonts/', 'url(\'./fonts/'))
        .pipe(replace('url(../fonts/', 'url(./fonts/'))
        .pipe(rename(function (path) {
            path.basename += '-scoped'
        }))
        .pipe(gulp.dest('./bower_components/bootstrap/dist/'));
});

gulp.task('xScope', function () {
    return gulp.src(['./bower_components/x-editable/dist/bootstrap3-editable/css/bootstrap-editable.css'])
        .pipe(scopeCss('.bsScope'))
        .pipe(replace(' html', '.html-bs'))
        .pipe(replace(' body', '.body-bs'))
        .pipe(rename(function (path) {
            path.basename += '-scoped'
        }))
        .pipe(gulp.dest('./bower_components/x-editable/dist/bootstrap3-editable/css/'));
});

var vendorDist = cfg.vendorDist;

gulp.task('move', function () {
    return gulp.src(vendorDist) //, {base: './'} to keep folder structure
        .pipe(gulp.dest('./dist/vendor'));
});

gulp.task('spVendor',function () {
    return gulp.src(['./build/**/*.*', '!./build/**/*spBs*.*'])
        .pipe(gulp.dest(cfg.sharePointMappedDrive));
});

gulp.task('build_vendor', ['bsScope', 'xScope'], function (cb) {
    runSequence('move', cb);
});

/**
 * Src section
 */
gulp.task('spSrc',function () {
    return gulp.src(['./build/**/*spBs*.*'])
        .pipe(gulp.dest(cfg.sharePointMappedDrive));
});

gulp.task('buildCss', function () {
    return gulp.src('./src/style/**/*.css')
        .pipe(concatCss(''))
        .pipe(gulp.dest('./build/spBsCtrls.css'));
});

gulp.task('buildJs', function (cb) {
    return gulp.src(['./src/js/ns.js', './src/js/**/*.js'])
        .pipe(concat('spBsCtrls.js'))
        .pipe(gulp.dest('./build/'));
});




/**
 * Common section
 */

gulp.task('legacy', function () {
    return gulp.src('./legacy/*.*')
        .pipe(gulp.dest('./build/'));
})

gulp.task('build', function (cb) {
    runSequence('build_vendor', 'buildCss', 'buildJs', 'legacy', cb)
});

gulp.task('watch', function () {
    return watch(['./src/js/**/*.js', './src/style/**/*.css'], function () {
        runSequence(['buildJs', 'buildCss'], 'spSrc');
    });
});

gulp.task('clean', function (cb) {
   return del(['./dist/', './build', cfg.sharePointMappedDrive], {force: true}, cb)
});

gulp.task('bundle', function () {
    return gulp.src('./bundle.config.js')
        .pipe(bundle())
        .pipe(gulp.dest('./build'))
});

gulp.task('default', function (cb) {
    runSequence('clean', 'build', 'bundle', ['spSrc', 'spVendor'], cb);
});

