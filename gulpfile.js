let gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('clean', async function(){
    del.sync('dist')
});

gulp.task('scss', function(){
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 8 versions']
        }))
        
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('style', function() {
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        'node_modules/slick-carousel/slick/slick.css',
        'node_modules/magnific-popup/dist/magnific-popup.css'
    ])
    .pipe(concat('libs.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('pug', function() {
    return gulp.src('app/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('app'))

});

gulp.task('html', function() {
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function() {
    return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function() {
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

gulp.task('export', async function() {
    let buildHtml = gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'));

    let buildCss = gulp.src('app/css/**/*.css')
    .pipe(gulp.dest('dist/css'));

    let buildJs = gulp.src('app/js/**/*.js')
    .pipe(gulp.dest('dist/js'));

    let buildFonts = gulp.src('app/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'));

    let buildImg = gulp.src('app/img/**/*.*')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', function(){
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'))
    gulp.watch('app/*.pug', gulp.parallel('pug'))
    gulp.watch('app/js/*.js', gulp.parallel('script'))

});

gulp.task('build', gulp.series('clean', 'export'));

gulp.task('default', gulp.parallel('style', 'scss', 'js', 'browser-sync', 'watch'));
