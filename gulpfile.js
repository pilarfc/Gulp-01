/* Dependencias */
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var obfuscate = require('gulp-obfuscate');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');

gulp.task('demoJS', function () {
  gulp.src('./src/assets/js/*.js')
  .pipe(concat('todo.js'))
  .pipe(obfuscate())
  .pipe(uglify())
  .pipe(gulp.dest('./public/js'))
});


gulp.task('demoCSS', function () {
    gulp.src('./src/assets/scss/*.scss')
    .pipe(sass({outputStyle: 'compressed'})
    .on ('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
});


gulp.task('demoHTML', function () {
    gulp.src('./src/*.html')
    .pipe(gulp.dest('./public'))
});


/* Servidor */ 
gulp.task('watchCambios', function() {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
});

gulp.watch('src/*.html', ['watchHTML'])
gulp.watch('src/assets/scss/*.scss', ['watchCSS'])
gulp.watch('src/assets/js/*.js', ['watchJS'])


gulp.task('watchHTML', ['demoHTML'], function() {
    browserSync.reload();
});

gulp.task('watchCSS', ['demoCSS'], function() {
    browserSync.reload();
});

gulp.task('watchJS', ['demoJS'], function() {
    browserSync.reload();
});