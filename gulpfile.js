var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
        return gulp.src('scss/*')
            .pipe(sourcemaps.init())
            .pipe(sass({
                    // outputStyle: 'compressed',
                    outputStyle: 'expanded',
                    sourceComments: 'map'
                }))
            .pipe(autoprefixer())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('css'))
        })

gulp.task('watch', function(){

    browserSync.init({
        server: "./"
    });

    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("**/*.css").on('change', browserSync.reload);
});
