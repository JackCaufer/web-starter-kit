import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';
import config from '../projectConfig';

const spriteMono = () => (
  gulp.src(`${config.src.iconsMono}/**/*.svg`)
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: '../sprite-mono.svg',
        },
      },
      shape: {
        transform: [
          {
            svgo: {
              plugins: [
                {
                  removeAttrs: {
                    attrs: ['class', 'data-name', 'fill.*', 'stroke.*'],
                  },
                },
              ],
            },
          },
        ],
      },
    }))
    .pipe(gulp.dest(config.dest.icons))
);

const spriteMulti = () => (
  gulp.src(`${config.src.iconsMulti}/**/*.svg`)
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: '../sprite-multi.svg',
        },
      },
      shape: {
        transform: [
          {
            svgo: {
              plugins: [
                {
                  removeAttrs: {
                    attrs: ['class', 'data-name'],
                  },
                },
                {
                  removeUselessStrokeAndFill: false,
                },
                {
                  inlineStyles: true,
                },
              ],
            },
          },
        ],
      },
    }))
    .pipe(gulp.dest(config.dest.icons))
);

export const spritesBuild = gulp.parallel(spriteMono, spriteMulti);

export const spritesWatch = () => {
  gulp.watch(`${config.src.iconsMono}/**/*.svg`, spriteMono);
  gulp.watch(`${config.src.iconsMulti}/**/*.svg`, spriteMulti);
};
