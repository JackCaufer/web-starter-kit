import gulp from 'gulp';
import config from './projectConfig';
import clean from './tasks/clean';
import server from './tasks/server';
import { templatesBuild, templatesWatch } from './tasks/templates';
import webpackTask from './tasks/webpack';
import { assetsBuild, assetsWatch } from './tasks/assets';
import { stylesBuild, stylesWatch } from './tasks/styles';
import { imagesBuild, imagesWatch } from './tasks/images';
import { spritesBuild, spritesWatch } from './tasks/sprites';

config.setEnv();

export const webpack = webpackTask;

export const build = gulp.series(
  clean,
  webpackTask,
  gulp.parallel(
    templatesBuild,
    stylesBuild,
    assetsBuild,
    imagesBuild,
    spritesBuild
  ),
);

export const watch = gulp.series(
  build,
  server,
  gulp.parallel(
    templatesWatch,
    stylesWatch,
    assetsWatch,
    imagesWatch,
    spritesWatch,
  ),
);
