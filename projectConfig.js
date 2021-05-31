const srcPath = 'src';
const destPath = 'public';

const config = {
  proxy: 'http://web-starter-kit.loc',
  src: {
    root: srcPath,
    sass: `${srcPath}/scss`,
    js: `${srcPath}/js`,
    htmlEntry: `${srcPath}/index.{html,twig,php}`,
    html: `${srcPath}/templates`,
    fonts: `${srcPath}/assets/fonts`,
    images: `${srcPath}/assets/images`,
    iconsMono: `${srcPath}/assets/icons/mono`,
    iconsMulti: `${srcPath}/assets/icons/multi`,
  },

  dest: {
    root: destPath,
    html: destPath,
    css: `${destPath}/css`,
    js: `${destPath}/js/`,
    templates: `${destPath}/templates`,
    fonts: `${destPath}/assets/fonts`,
    images: `${destPath}/assets/images`,
    icons: `${destPath}/assets/icons`,
  },

  setEnv() {
    this.isProd = process.argv.includes('--prod');
    this.isDev = !this.isProd;
  },
};

export default config;
