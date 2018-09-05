let gulp = require('gulp');
let ts = require("gulp-typescript")
let nodemon = require("gulp-nodemon");

gulp.task("default", ["serve"]);

gulp.task("watch", () => {
  gulp.watch('src/**/*.ts', ["compile"]);
});

gulp.task("compile", () => {
  const tsProject = ts.createProject('tsconfig.json');  
  const tsResult = tsProject.src()
  .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('build'));
})

gulp.task("serve", ["compile", "watch"], () => {
  nodemon({
    script: "build/app.js",
    env: { "NODE_ENV": "development" }
  })
})