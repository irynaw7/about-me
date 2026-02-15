const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const minifyJS = require("gulp-minify");
const browserSync = require("browser-sync").create();

/* ===== SCSS → CSS ===== */
function minCSS() {
  return gulp
    .src("./app/css/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./public/css"))
    .pipe(browserSync.stream());
}

/* ===== JS ===== */
function minJS() {
  return gulp
    .src("./app/js/main.js")
    .pipe(minifyJS())
    .pipe(gulp.dest("./public/js"))
    .pipe(browserSync.stream());
}

/* ===== Watch ===== */
function watchAll() {
  gulp.watch("./app/css/**/*.scss", minCSS);
  gulp.watch("./app/js/**/*.js", minJS);
}

/* ===== Browser Sync ===== */
function serve() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });

  gulp.watch("./*.html").on("change", browserSync.reload);
}

/* ===== Tasks ===== */
exports.minCSS = minCSS;
exports.minJS = minJS;
exports.default = gulp.parallel(serve, watchAll);
