import gulp from 'gulp';
import config from '../projectConfig';

import named from 'vinyl-named';
import plumber from 'gulp-plumber';
import gulplog from 'gulplog';
import notify from 'gulp-notify';

import webpackStream from 'webpack-stream';
import webpackConfig from '../webpack.config';

export default (callback) => {
  let firstBuildReady = false;

  function done(err, stats) {
    firstBuildReady = true;

    if (err) {
      return;
    }

    gulplog[stats.hasErrors() ? 'error' : 'info'](stats.toString({
      colors: true,
    }));
  }

  gulp.src(`${config.src.js}/**/*.js`)
    .pipe(plumber({
      errorHandler: notify.onError((err) => ({
        title: 'Webpack',
        message: err.message,
      })),
    }))
    .pipe(named())
    .pipe(webpackStream(webpackConfig, null, done))
    .pipe(gulp.dest(config.dest.js))
    .on('data', function() {
      if (firstBuildReady) {
        callback();
      }
    });
};
