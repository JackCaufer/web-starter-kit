import browserSync from 'browser-sync';
import config from '../projectConfig';

const server = (callback) => {
  browserSync.create().init({
    proxy: config.proxy,
    // server: {
    //   baseDir: config.dest.root,
    // },
    files: [
      `${config.dest.html}/**/*.{html,php,twig}`,
      `${config.dest.css}/**/*.css`,
      `${config.dest.js}/**/*.js`,
      {
        match: `${config.dest.images}/**/*`,
        fn() {
          this.reload();
        },
      },
    ],
    open: false,
    notify: false,
  });

  callback();
};

export default server;
