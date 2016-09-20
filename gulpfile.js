var gulp = require ('gulp'),
	gutil = require('gulp-util'),
	concat = require('gulp-concat'),
	compass = require('gulp-compass');
	connect = require('gulp-connect');

var jsSources =['components/scripts/test.js']	

var sassSources = ['components/sass/style.scss']
	
gulp.task('log',function(){
	gutil.log('workflows are awesome');
});

gulp.task('js',function(){
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(gulp.dest('builds/development/js'))
		.pipe(connect.reload());
});

gulp.task('compass',function(){
	gulp.src(sassSources)
		.pipe(compass({
			sass:'components/sass',
			image: 'builds/development/images',
			style: 'expanded'
		}))
		.on('error', gutil.log)
		.pipe(gulp.dest('builds/development/css'))
		.pipe(connect.reload());
	
});

gulp.task('all',['js','compass'])


gulp.task('watch', function(){
	gulp.watch('components/sass/*.scss', ['compass']);
	gulp.watch(jsSources,['js']);
});

gulp.task('start',['connect','watch'])

gulp.task('connect', function(){
	connect.server({
		root:'builds/development/',
		livereload: true
	})
	
})