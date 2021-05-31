import config from './projectConfig';

import AssetsPlugin from 'assets-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

config.setEnv();

const webpackConfig = {
  watch: config.isDev,
	mode: config.isProd ? 'production' : 'development',
	output: {
    publicPath: config.dest.js,
    filename: config.isDev ? '[name].js' : '[name]-[chunkhash:10].js'
	},
  devtool: config.isDev ? 'cheap-module-inline-source-map' : false,
	module: {
		rules: [
			{
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
		]
	},
	optimization: {
		splitChunks: {
      chunks: 'all',
    }
	},
	plugins: [
    new ESLintPlugin({
      extensions: ['.tsx', '.ts', '.js'],
      exclude: 'node_modules'
    })
  ]
};

if (config.isProd) {
  webpackConfig.plugins.push(new AssetsPlugin({
    filename: 'webpack.json',
    path: __dirname + '/manifest',
    processOutput(assets) {
      for (let key in assets) {
        assets[key + '.js'] = assets[key].js.slice(webpackConfig.output.publicPath.length);
        delete assets[key];
      }
      return JSON.stringify(assets);
    }
  }));
}

export default webpackConfig;
