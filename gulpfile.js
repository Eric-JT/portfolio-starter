const GULP         = require("gulp");
const BABEL        = require("gulp-babel");
const ESLINT       = require("gulp-eslint");
const PUG          = require("gulp-pug");
const SASS         = require("gulp-sass");
const PREFIX       = require("gulp-autoprefixer");
const BROWSER_SYNC = require("browser-sync");


/*
*  Build you pug files
*/
GULP.task("pug", function() {
  return GULP.src("index.pug")
  .pipe(PUG())
  .pipe(GULP.dest("_site/"))
  .pipe(BROWSER_SYNC.reload({stream:true}))
  .pipe(GULP.dest(""));
});


/**
 * Compile scss files
 */
GULP.task("sass", function () {
  return GULP.src("2-assets/css/main.scss")
  .pipe(SASS({
    includePaths: ["css"],
    onError: BROWSER_SYNC.notify
  }))
  .pipe(PREFIX(["last 15 versions", "> 1%", "ie 8", "ie 7"], { cascade: true }))
  .pipe(GULP.dest("_site/css"))
  .pipe(BROWSER_SYNC.reload({stream:true}))
  .pipe(GULP.dest("css"));
});

/*
* Run browser-sync
*/
GULP.task("browser-sync",["sass", "pug"], function() {
  BROWSER_SYNC({
    server: {
      baseDir: "_site"
    },
    notify: false
  });
});

/*
*  Copy img folder into _site
*/
GULP.task("cp-img", function() {
  return GULP.src("2-assets/img/**")
  .pipe(GULP.dest("_site/img"))
  .pipe(GULP.dest("img"));
});

/*
* Watch folders for changes
*/
GULP.task("watch", function() {
  GULP.watch("2-assets/css/**", ["sass"]);
  GULP.watch("index.pug", ["pug"]);
  GULP.watch("1-includes/**", ["pug"]);
});

GULP.task("default", ["browser-sync", "watch", "cp-img"]);
