'use strict'


var gulp= require('gulp'),
    sass= require('gulp-sass '),
    browserSync = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    uglify= require('gulp-uglify'),
    usemin = require('gulp-usermin'),
    rev= require('gulp-rev'),
    cleanCss=require('gulp-clean-css'),
    flatmap= require('gulp-flatmap'),
    htmlmin=require('gulp-htmlmin');

gulp.task('sass', function(){
    gulp.src('./css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
        
})    

gulp.task('sass:watch', function(){
    gulp.watch('./css/*.scss', ['sass']);
});

gulp.task('browser-sync', function(){
    var files = ['./*.html', './css/*.css', './imagenes/*.{png, jpg,jpeg, gif}','./js/*.js'];
    browserSync.init(files, {
        sever :{
            baseDir:'./'
        }
    });
});

gulp.task('defauld', ['browser-sync'], function(){
    gulp.start('sass:watch');
});

gulp.task('clean', function(){
    return del(['dist']);
});

gulp.task('imagemin', function(){
    return gulp.src('./imagenes/*.{png, jpg,jpeg,gif}')
               .pipe(imagemin({optimizationLevel:3, progressive:true, interlaced:true}))
               .pipe(gulp.dest('dist/imagenes'));

});

gulp.task('usemin', function(){
    return gulp.src('./*.html')
                .pipe(flatmap(function(stream,file){
                    return stream
                       .pipe(usemin({
                           css:[rev()],
                           html:[function() {return htmlmin({collapseWhitespace: true})}],
                           js:[uglify(),rev()],
                           inlinejs:[uglify()],
                           inlinecss:[cleanCss(),'concat']
                       }));
                }))
                .pipe(gulp.dest('dist/'));

});

gulp.task('build',['clean'], function(){
    gulp.start('imagemin', 'usemin');
});

