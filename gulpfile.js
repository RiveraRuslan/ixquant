// Set-ExecutionPolicy RemoteSigned -Scope Process
//npm i normalize.css slick-carousel magnific-popup (Нормолайз, Слик, Магнифик);
//npm install --save-dev gulp-uglify, npm install --save-dev gulp-concat  (JS Сжатие);
//npm i gulp-rename --save-dev
//$ npm install del --save-dev
let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync');
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');
let rename = require('gulp-rename');
let del = require('del');
let autoprefixer = require('gulp-autoprefixer');

gulp.task('clean', async function() {
    del.sync('dist')   
});

//Откуда куда сжатие компелятора
gulp.task('scss', function() {
    return gulp.src('app/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'})) //Стиль сжатия expanded compressed
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 8 versions'],
        cascade: false
    })) 
    .pipe(rename({suffix: '.min'})) //Стиль сжатия
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function() {
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        'node_modules/slick-carousel/slick/slick.css',
        'node_modules/jquery-form-styler/dist/jquery.formstyler.css',
        'node_modules/jquery-form-styler/dist/jquery.formstyler.theme.css',
        'node_modules/magnific-popup/dist/magnific-popup.css'
    ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('app/scss'))
    .pipe(browserSync.reload({stream: true}))
});

//browser-sync html
gulp.task('html', function() {
    return gulp.src('app/**/*.html')
    .pipe(browserSync.reload({stream: true}))
});

//browser-sync JS
gulp.task('script', function() {
    return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function() {
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream: true}))
});

//browser-sync css
gulp.task('browser-sync', function() { //Вызов (gulp browser-sync);
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    })
});

gulp.task('export', function(){
    let buildHtml = gulp.src('app/**/*.html')
      .pipe(gulp.dest('dist'));
  
    let BuildCss = gulp.src('app/css/**/*.css')
      .pipe(gulp.dest('dist/css'));
  
    let BuildJs = gulp.src('app/js/**/*.js')
      .pipe(gulp.dest('dist/js'));
      
    let BuildFonts = gulp.src('app/fonts/**/*.*')
      .pipe(gulp.dest('dist/fonts'));
  
    let BuildImg = gulp.src('app/img/**/*.*')
      .pipe(gulp.dest('dist/img'));   
  });

//Подкл отслеживание
gulp.task('watch', function(){
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('app/**/*.html', gulp.parallel('html'));
    gulp.watch('app/js/*.js', gulp.parallel('script'));
});

gulp.task('build', gulp.series('clean', 'export'));

//Несколько процессов
gulp.task('default', gulp.parallel('css', 'scss', 'js', 'browser-sync', 'watch'));







