const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
	target: 'web',
	mode: 'development',


	devtool: 'cheap-module-source-map',
	devServer: {  // настройки devServer'а
		port: 9999, // по дефолту 8080
		contentBase: baseWebpackConfig.externals.paths.dist,
		overlay: {
			warnings: true,
			errors: true
		},
		open: true
	},
	plugins: [
		new webpack.SourceMapDevToolPlugin({
			filename: '[file].map'
		})
	]
});

module.exports = new Promise((resolve) => {
	resolve(devWebpackConfig);
});

