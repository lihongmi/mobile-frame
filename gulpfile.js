var gulp = require('gulp');
var tmodjs = require('gulp-tmod');

gulp.task('default', function(){
    return gulp.src(['./src/page/**/*.html', './src/widget/**/*.html'])
            .pipe(tmodjs({
                base: './src',
                combo: true,
                output: './dist'
            }));
});