import config from '../projectConfig';

import gulp from 'gulp';
import gulpIf from 'gulp-if';
import revReplace from 'gulp-rev-replace';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import embedSvg from 'gulp-embed-svg';

let startExtname = '';

let dest = (src, dest) => {
  return gulp.src(src)
    .pipe(plumber())
    .pipe(gulpIf(config.isProd, rename(function (path) {
      startExtname = path.extname
      path.extname = ".html"
    })))
    .pipe(gulpIf(config.isProd, revReplace({
      manifest: gulp.src('manifest/{webpack.json,style-manifest.json}', {allowEmpty: true})
    })))
    // .pipe(embedSvg({
    //   root: config.src.iconsEmbed
    // }))
    .pipe(gulpIf(config.isProd, rename(function (path) {
      path.extname = startExtname
    })))
    .pipe(gulp.dest(dest))
}

export const templatesBuild = () => (
  dest(config.src.htmlEntry, config.dest.html),
  dest(`${config.src.html}/**/*.{html,php,twig}`, config.dest.templates)
);

export const templatesWatch = () => {
  gulp.watch(`${config.src.root}/**/*.{html,php,twig}`, templatesBuild)
};
