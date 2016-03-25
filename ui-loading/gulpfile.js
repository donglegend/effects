var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();
var exec = require('child_process').exec;
 
gulp.task('testAutoFx', function () {
    gulp.src('css/*.css')
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, 
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(gulp.dest('build/'));
});


gulp.task('watch', function (){
    gulp.watch("css/*.css", ['testAutoFx'])
})

gulp.task("build", function (){
    gulp.src("build/*.css")
        .pipe(gulp.dest("dist/"));
    gulp.src("js/ui-loading.js")
        .pipe(gulp.dest("dist/"))
})

gulp.task('default', function (){
    exec('compass watch');
    gulp.run('watch');
})

