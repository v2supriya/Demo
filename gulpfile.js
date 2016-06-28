var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    webserver = require('gulp-webserver'),
    del = require('del');

var config = {
    bowerDir: './bower_components',
    publicDir: './app/public',
    distDir: 'dist',
    appDir: './app'
};

// ////////////////////////////////////////////////
// Cleanup Tasks
// ///////////////////////////////////////////////

gulp.task('build:cleanfolder', function () {
    del(['build/**']);
});


// ////////////////////////////////////////////////
// Font Tasks
// ///////////////////////////////////////////////

gulp.task('fonts', function () {
    return gulp.src([
        config.bowerDir + '/bootstrap-sass/assets/fonts/**/*',
    ])
        .pipe(gulp.dest(config.publicDir + '/fonts'));
});


// ////////////////////////////////////////////////
// Javascript Tasks
// ///////////////////////////////////////////////
gulp.task('js', function () {
    return gulp.src([
        config.bowerDir + '/jquery/dist/jquery.min.js',
        config.bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.js',
    ])
        .pipe(uglify(config.appDir + '/app.js', {
            compress: false,
            outSourceMap: true,
        }))
        .pipe(gulp.dest(config.publicDir + '/js'))
        .pipe(reload({stream:true}));
});

// ////////////////////////////////////////////////
// CSS Tasks
// ///////////////////////////////////////////////
gulp.task('css', function () {
    return gulp.src(config.appDir + '/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: [config.bowerDir + '/bootstrap-sass/assets/stylesheets'],
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.publicDir + '/css'))
        .pipe(reload({stream:true}));
});

// ////////////////////////////////////////////////
// HTML Tasks
// ///////////////////////////////////////////////

gulp.task('html', function(){
    gulp.src(config.appDir + "/**/*.html")
    .pipe(reload({stream:true}))    
});



// ////////////////////////////////////////////////
// Bower sync Tasks
// ///////////////////////////////////////////////
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: "./app/"
        }
    });
});

// ////////////////////////////////////////////////
// Watch Tasks
// ///////////////////////////////////////////////
gulp.task('watch', function () {
    gulp.watch(config.appDir + "/scss/**/*.scss", ['css']);
    gulp.watch(config.appDir + "/js/**/*.js", ['js']);
    gulp.watch(config.appDir + "/**/*.html", ['html']);
});

// ////////////////////////////////////////////////
// Default task
// ///////////////////////////////////////////////
gulp.task('default', ['build:cleanfolder', 'css', 'js', 'html', 'fonts', 'browser-sync', 'watch']);
