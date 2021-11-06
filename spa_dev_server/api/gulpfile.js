var gulp = require('gulp'),
	gulpIf = require('gulp-if'),
	sass = require('gulp-sass'),
	cleancss = require('gulp-clean-css'),
	browserSync = require('browser-sync').create(), //Подключаем browser-sync-пакет
	svgSprite = require('gulp-svg-sprites'),
	svgmin = require('gulp-svgmin'),
	cheerio = require('gulp-cheerio'),
	replace = require('gulp-replace'),
	// gutil = require( 'gulp-util' ),
	// ftp = require('gulp-ftp'),
	autoprefixer = require('gulp-autoprefixer'),
	del = require('del'),
	sourcemaps = require('gulp-sourcemaps');
	// uncss = require('gulp-uncss');
	fileinclude = require('gulp-file-include'),
	htmlbeautify = require('gulp-html-beautify');






//----------------------Синхронизация браузера, отслеживание изменений в SCSS и в HTML файлах-------------------------
//----------------------Синхронизация браузера, отслеживание изменений в SCSS и в HTML файлах-------------------------
gulp.task('serve', function(done) {  // task sass выполняется первым (перед  task serve) так как записан в квадратных скобках
	browserSync.init({
		server: "../frontend/",  // Остлеживаем всё в папке site
	});
	gulp.watch("../frontend/media/**/*", gulp.series('clear-img', 'img-src', 'svgSpriteBuild'));
	gulp.watch("../frontend/js/**/*").on('change', browserSync.reload);
	gulp.watch("../frontend/sass/**/*", gulp.series('clear-css', 'sass', 'css-src')); // Остлеживаем в папке site папку sass  и все файлы .scss
	gulp.watch(["../frontend/html/*.html", "../frontend/components/*.html"], gulp.series('html-src')).on('change', browserSync.reload); // при изменении html в папке site перезагружается браузер
	done();
});
gulp.task('sass',  function(done){ //Создаём таск "sass"
	gulp.src(['../frontend/sass/**/*.sass','../frontend/sass/**/*.scss']) //Берём источник
		.pipe(sourcemaps.init())
		.pipe(sass(/*{outputStyle:'compressed'}*/).on('error',sass.logError)) //Преобразуем Sass в Css
		// .pipe(uncss({
		//           html: ['../frontend/filter-industrial-tires.html']
  //       }))

		.pipe(autoprefixer(['last 2 versions', /*'> 1%',*/ /*'ie 8', 'ie 7'*/], { cascade: true }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('../frontend/css')) //Выгружаем результат в папку "css"
		.pipe(browserSync.stream()); //все изменения впиливаются в браузер без перезагрузки
	done();
});





//---------------------Минимизация монохромных SVG-картинок и создание спрайта---------------------------------------
//---------------------Минимизация монохромных SVG-картинок и создание спрайта---------------------------------------
gulp.task('svgSpriteBuild', function (done) {
	gulp.src('./../frontend/media/svg-mono/**/*.svg')
		.pipe(svgmin({			// минимизируем svg
			js2svg: {
				pretty: true	// удаляет все посторонние пробелы
			},
			plugins: [{
				removeTitle: true
			}]
		}))
		.pipe(cheerio({
			run: function ($) {		// удаляет все ненужные атрибуты
				$('[fill]').removeAttr('fill');
				$('[style]').removeAttr('style');
				$('[title]').removeAttr('title');
			},
			parserOptions: { xmlMode: true }
		}))
		.pipe(replace('&gt;', '>'))	// cheerio преобразует '>' в '&gt;', заменяем.
		.pipe(gulp.dest('../frontend/svg'));
	done();
});



//---------------------Минимизация цветных SVG-картинок---------------------------------------------------------------
//---------------------Минимизация цветных SVG-картинок---------------------------------------------------------------
gulp.task('sprite', function (done) {
	gulp.src('./../frontend/svg/*.svg')
		.pipe(svgSprite({
				mode: "symbols",
				preview: false,
				svg: {
					symbols: './global-sprite.html'
				}
			}
		))
		.pipe(gulp.dest('../frontend/img'));
	gulp.src('./../frontend/svg/chars/*.svg')
		.pipe(svgSprite({
				mode: "symbols",
				preview: false,
				svg: {
					symbols: './chars-sprite.html'
				}
			}
		))
		.pipe(gulp.dest('../frontend/img'));
	done();
});


gulp.task('html-src', function (done) {
	var options = {
		indentSize: 2,
		"preserve_newlines": false
	};
	gulp.src('./../frontend/html/*.html').pipe(fileinclude()).pipe(htmlbeautify(options)).pipe(gulp.dest('./src'));
	done();
});
gulp.task('css-src', function (done) {
	gulp.src('./../frontend/sass/**/*.css').pipe(gulp.dest('./../frontend/css/'));
	done();
});
gulp.task('img-src', function (done) {
	gulp.src(['./../frontend/media/*.*', './../frontend/media/global/*.*']).pipe(gulp.dest('./../frontend/img/'));
	gulp.src(['./../frontend/media/webp/*.*']).pipe(gulp.dest('./../frontend/img/webp/'));
	gulp.src(['./../frontend/media/svg-color/**/*.*']).pipe(gulp.dest('./../frontend/svg/'));
	done();
});



gulp.task('clear-css', function (done) {
	done();
	del(['./../frontend/css/*.*', './../frontend/css/global/*.*']);
});
gulp.task('clear-img', function (done) {
	del(['./../frontend/img/*']);
	del(['./../frontend/svg/*']);
	done();
});







gulp.task('default', gulp.series('html-src', 'css-src', 'img-src', 'svgSpriteBuild', 'sass', 'serve'));
























