const gulp = require('gulp');
const babel = require('gulp-babel');

// Javascript
function scripts() {
    return gulp.src('js-src/app.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('js'))
}

exports.scripts = scripts;

// Watch
gulp.task('watch', function() {
    return gulp.watch('js-src/' + 'app.js', scripts);
});