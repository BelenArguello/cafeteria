const { src, dest, watch, series, parallel } = require('gulp');

// CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

// IMAGENES
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

function css() {
    return src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer(), cssnano() ]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'));
}

function imagenes() {
    return src('src/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3 }))
        .pipe(dest('build/img'));
}

function versionWebp() {
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp())
        .pipe(dest('build/img'));
}

function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes); 
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.default = series(imagenes, versionWebp, css, dev);
