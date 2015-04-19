module.exports = {
    bundle: {
        main: {
            scripts: [
                './dist/spBsCtrls.js'
            ],
            styles: './dist/spBsCtrls.css',
            options: {
                uglify: false, // don't minify js since bower already ships with one
                minCSS: false, // don't minify css since bower already ships with one
                rev: false,
                fileName:'spBs'
            }
        },
        vendor: {
            scripts: [
                './dist/vendor/lodash.min.js',
                './dist/vendor/jquery.min.js',
                './dist/vendor/moment-with-locales.min.js',
                './dist/vendor/js/bootstrap.min.js',
                './dist/vendor/bootstrap-switch.min.js',
                './dist/vendor/js/select2.min.js',
                './dist/vendor/js/i18n/ru.js',
                './dist/vendor/bootstrap-datetimepicker.min.js',
                './dist/vendor/bootstrap-editable.min.js'
                ],
            styles:[
                './dist/vendor/css/bootstrap.min-scoped.css',
                './dist/vendor/bootstrap-editable-scoped.css',
                './dist/vendor/css/select2.min.css',
                './dist/vendor/select2-bootstrap.css',
                './dist/vendor/bootstrap-datetimepicker.min.css',
                './dist/vendor/bootstrap-switch.min.css'
            ],
            options: {
                rev: false,
                fileName:'spBs_vendor'
            }
        }
    },
    copy:{
        src: './dist/vendor/fonts/**/*.*',
        base: './dist/'
    }
};