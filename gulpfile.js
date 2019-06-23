var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var pug = require("gulp-pug");
var browserSync = require("browser-sync");

// sassとpug,jsを監視して変更時コンパイル
gulp.task('watch', () => {
  gulp.watch(['./src/sass/**'], () => {
    gulp.start(['sass']);
  });
  gulp.watch(['./src/pug/**'], () => {
    gulp.start(['pug']);
  });
  gulp.watch('./src/js/**/*.js', () => {
    gulp.start(['js']);
  });
});

// sassのコンパイル
gulp.task("sass", () => {
  gulp.src("./src/sass/**/*.scss")
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sass({
      includePaths: require('node-reset-scss').includePath
    }))
    .pipe(gulp.dest("./docs/css"))
    .pipe(browserSync.stream())
});

// pugのコンパイル
gulp.task("pug", () => {
  var option = {
    pretty: true
  }
  gulp.src("./src/pug/**/*.pug")
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(pug(option))
    .pipe(gulp.dest("./docs"))
});

gulp.task('reload', () => {
  browserSync.reload();
});

/*
gulp.task('img', function() {
    gulp.src('./src/img/*.jpg')
        .pipe(gulp.dest('./docs/img'));
});
*/

// jsの移動
gulp.task('js', function() {
    gulp.src('./src/js/**/*.js')
        .pipe(gulp.dest('./docs/js'));
});

gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: "./docs"
    }
  });
  gulp.watch("./docs/js/**/*.js", ['reload']);
  gulp.watch("./docs/*.html", ['reload']);
});

gulp.task('default', ['sass', 'pug', 'js', 'watch', 'browser-sync']);
