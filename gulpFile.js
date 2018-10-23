var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var rename = require('gulp-rename');
var minifycss = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var run = require('run-sequence');
var del = require('del');
var uglify = require('gulp-uglify-es').default;
var concat = require('gulp-concat');
var ghPages =require('gulp-gh-pages');

gulp.task('style', function () {
	gulp.src('less/**/*.less')
		.pipe(plumber())
		.pipe(concat('style.less'))
		.pipe(less())
		.pipe(postcss([
			autoprefixer()
			]))
		.pipe(gulp.dest('css'))
		.pipe(gulp.dest('build/css'))
		.pipe(minifycss())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('css'))
		.pipe(gulp.dest('build/css'))
		.pipe(server.stream());
});

gulp.task('serve', function () {
	server.init({
		server: 'build/',
		notify: false,
		open: true,
		cors: true,
		ui: false
	});

	gulp.watch('less/**/*.less', ['style']);
	gulp.watch('*.html', ['html']);
	gulp.watch('js/*.js', ['js']);
});

gulp.task('images', function () {
	return gulp.src('img-original/**/*.{jpg,png,svg}')
		.pipe(imagemin([
			imagemin.optipng({optimizationLevel: 3}),
			imagemin.jpegtran({progressive: true}),
			imagemin.svgo()
			]))
		.pipe(gulp.dest('img-min'));
});

gulp.task('webp', function() {
	return gulp.src('img-min/**/*.{png,jpg}')
		.pipe(webp({
			quality: 90
		}))
		.pipe(gulp.dest('img-min'));
});

gulp.task('sprite', function() {
	return gulp.src('build/img-min/sprite-*.svg')
		.pipe(svgstore({
			inlineSvg: true
		}))
		.pipe(rename('sprite.svg'))
		.pipe(gulp.dest('img-min'))
		.pipe(gulp.dest('build/img-min'));
});

gulp.task('html', function() {
	gulp.src('*.html')
		.pipe(posthtml([
			include()	
		]))
		.pipe(gulp.dest('build'))
		.pipe(server.stream());
})

gulp.task('copy', function() {
	return gulp.src([
		'fonts/**/*.{woff,woff2}',
		'img-min/**',
		'*.ico'				
	], {
		base: './'
	})
	.pipe(gulp.dest('build'));
})

gulp.task('del', function() {
	return del('build');
});

gulp.task('js', function() {
	return gulp.src('js/*.js')
		.pipe(gulp.dest('build/js'))
		.pipe(uglify())
		.pipe(gulp.dest('js-min'))
		.pipe(gulp.dest('build/js-min'))
		.pipe(server.stream());
});

gulp.task('deploy', function() {
	return gulp.src('build/**/*')
		.pipe(ghPages());
});

gulp.task('build', function(done) {
	run(
		'del',
		'copy',
		'style',
		'sprite', 
		'html',
		'js', 
		done
	);
});