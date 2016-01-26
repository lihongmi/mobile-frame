var gulp = require('gulp');
var tmodjs = require('gulp-tmod');

gulp.task('default', function(){
    return gulp.src(['./src/widget/**/*.html', './src/widget/*.html'])
            .pipe(tmodjs({
                base: './src/widget',
                combo: true,
                output: './dist'
            }));
});