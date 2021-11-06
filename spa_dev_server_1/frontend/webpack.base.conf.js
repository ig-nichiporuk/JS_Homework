const path = require('path'), // подключение модуля path
	MiniCssExtractPlugin = require('mini-css-extract-plugin'),
	// CopyWebpackPlugin = require('copy-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin');


const PATHS = {
	src: path.join(__dirname, './src'),
	dist: path.join(__dirname, './dist'),
	assets: 'assets/'
};
module.exports = {

	externals: {
		paths: PATHS
	},
	entry: {
		app: `${PATHS.src}/js/app.js`
	},
	output: {
		filename: `${PATHS.assets}js/[name].[hash].js`,   // [name] название файла выхода будет app, как у ключа файла входа
		path: PATHS.dist,
		publicPath: '/'
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					name: 'vendors',
					test: /node_modules/,
					chunks: 'all',
					enforce: true
				}
			}
		}
	},
	resolve: {
		extensions: ['.less', '.hbs', '.js', '.sass', '.scss']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
					/* 'eslint-loader'*/
				]
			},
			{
				test: /\.s(a|c)ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								config:  `${PATHS.src}/js/postcss.config.js`
							},
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}

				]
			},

			{
				test: /\.css$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								config:  `${PATHS.src}/js/postcss.config.js`
							},
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]'
				}
			},
			{
				test: /\.hbs$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'handlebars-loader',
						options: {
							helperDirs: [
								__dirname + '/js/helpers/handlebars'
							]
						}
					}
				]
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								config:  `${PATHS.src}/js/postcss.config.js`
							},
							sourceMap: true
						}
					},
					{
						loader: 'less-loader',
						options: {
							sourceMap: true
						}
					}

				]
			}
		]
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: `${PATHS.assets}css/[name].[contenthash].css`
			// chunkFilename: '[id].css',
		}),
		/* new CopyWebpackPlugin({
			patterns: [
				{from: `${PATHS.src}/img/`, to: `${PATHS.assets}/img/`}
			]
		}),*/
		new HtmlWebpackPlugin({
			template: `${PATHS.src}/index.html`,
			filename: './index.html',
			inject: true // Отключить автоматическое добавление тега link и script в html (прописать в html их вручную)
		})
	]
};


