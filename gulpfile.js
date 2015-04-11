/**
 * Created by sp-admin on 4/11/2015.
 */
    var gulp = require('gulp');
    var scopeCss = require("gulp-scope-css");
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var concatCss = require('gulp-concat-css');

gulp.task('bsScope', function () {
    gulp.src('./bower_components/bootstrap/dist/**/*.css')
        .pipe(scopeCss('.bsScope'))
        .pipe(replace(' html', '.html-bs'))
        .pipe(replace(' body', 'body-bs'))
        .pipe(rename(function (path) {
            path.basename += '-scoped'
        }))
        .pipe(gulp.dest('./bower_components/bootstrap/dist/'));
});

gulp.task('fuScope', function () {
    gulp.src('./bower_components/fuelux/dist/**/*.css')
        .pipe(scopeCss('.bsScope'))
        .pipe(replace(' html', '.html-bs'))
        .pipe(replace(' body', 'body-bs'))
        .pipe(rename(function (path) {
            path.basename += '-scoped'
        }))
        .pipe(gulp.dest('./bower_components/fuelux/dist/'));
});

var vendorDist = [
    './bower_components/bootstrap/dist/**/*.*',
    './bower_components/fuelux/dist/**/*.*',
    './bower_components/jquery/dist/**/*.*'
];

gulp.task('move', function () {
    gulp.src(vendorDist) //, {base: './'} to keep folder structure
        .pipe(gulp.dest('./dist/vendor/'));
});

gulp.task('moveSp', function () {
    gulp.src('./dist/**/*.*')
        .pipe(gulp.dest('C:\\Program Files\\Common Files\\microsoft shared\\Web Server Extensions\\15\\TEMPLATE\\LAYOUTS\\spBs'));
});

gulp.task('buildCss', function () {
    gulp.src('./src/style/**/*.css')
        .pipe(concatCss(''))
        .pipe(gulp.dest('./dist/bundle.css'));
})

gulp.task('vendor', ['bsScope', 'fuScope', 'move', 'moveSp']);