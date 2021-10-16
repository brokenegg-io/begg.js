const { src, dest, task, series } = require('gulp');
const uglifyes = require('uglify-es');
const composer = require('gulp-uglify/composer');
const browsersync = require('browser-sync');
const uglify = composer(uglifyes, console);
const babel = require('gulp-babel');
const minify = require('gulp-minify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const replace = require('gulp-replace');
var removeEmptyLines = require('gulp-remove-empty-lines');



concatenateFiles = () =>
        src(['src/*.js', 'src/**/*.js'], { sourcemaps: false })
        //.pipe(babel({ presets: ['es2015'] }))
        .pipe(replace(/const(.{0,})require(.{0,});/g, ''))
        .pipe(replace(/export default/g, ''))
        .pipe(replace(/'use strict';/g, ''))
        .pipe(replace(/module.exports(.{0,})/g, ''))
        .pipe(replace(/define\s?\(\[.*\],\s?function\s?\(.*\)\s?\{/g, ''))
        .pipe(replace(/\}\)\;\s?$/g, ''))
        .pipe(removeEmptyLines())
        //.pipe(minify())
        //.pipe(uglify())
        .pipe(concat('begg.js'))
        .pipe(dest('dist'));
    
minifyFiles = () => 
    src(['dist/begg.js'], { sourcemaps: false })
    .pipe(minify())
    .pipe(uglify())
    .pipe(dest('dist'));

exports.default = series(concatenateFiles);
