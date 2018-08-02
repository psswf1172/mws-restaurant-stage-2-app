/* eslint-env node */

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const imageminWebp = require('imagemin-webp');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const minify = require('gulp-babel-minify');

gulp.task('copy-images', () =>
	gulp.src('img/*')
	.pipe(imagemin({
		progressive: true,
		use: [imageminWebp({quality: 50})]
	}))
	.pipe(gulp.dest('dist/img'))
);

gulp.task('scripts', () =>
	gulp.src('js/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist/js'))
);

gulp.task('scripts-dist', () =>
	gulp.src('js/*.js')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat('all.js'))
		.pipe(minify({
			mangle: {
				keepClassName: true
			}
		}))
		.pipe(plumber.stop())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/js'))
);

gulp.task('styles', () =>
	gulp.src('sass/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('dist/css'))
);
