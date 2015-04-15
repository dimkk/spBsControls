var cfg = {
    entry:'./src/entry.js',
    output: {
        path: './dist',
        filename: 'spBsCntrls.js'
    },
    module:  {
        loaders: [
            {test: /\.css$/, loader: "style!css"},
            {test: /\.(woff|svg|ttf|eot)([\?]?.*)$/, loader: "file-loader?name=/_layouts/15/spBs/[name].[ext]"}
        ]
    },
    resolve : {
        modulesDirectories : ['node_modules', 'bower_components'],
        root: ['./bower_components']
    },
    plugins: [
        new BowerWebpackPlugin({
            excludes: /.*\.less/,
            searchResolveModulesDirectories: true
        }),
        //new wp.ResolverPlugin(
        //    new wp.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        //),
        new wp.ProvidePlugin({
            $:      "jquery",
            jQuery: "jquery"
        })]
};
//gulp.task('webpack', function () {
//    return gulp.src('./src/entry.js')
//        .pipe(webpack(cfg))
//        //.pipe(rename(function (path) {
//        //    if (path.extname === '.js') {
//        //        path.basename = 'spBsCntrls';
//        //    }
//        //}))
//        //.pipe(gulp.dest('./dist'));
//});

gulp.task("wp", function(callback) {
    // run webpack
    wp(cfg, function(err, stats) {
        if(err) console.log(err);
        //console.log(stats);
        callback();
    });
});

gulp.task('default', ['wp', 'moveSp']);
/**
 * Created by sp-admin on 4/13/2015.
 */
