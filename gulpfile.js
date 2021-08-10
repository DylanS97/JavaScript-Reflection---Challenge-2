const gulp = require('gulp');
const babel = require('gulp-babel');

// Javascript
function scripts() {
    return gulp.src('resources/js/app.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('public/js'))
}

exports.scripts = scripts;

// Watch
gulp.task('watch', function() {
    return gulp.watch('resources/js/' + 'app.js', scripts);
});