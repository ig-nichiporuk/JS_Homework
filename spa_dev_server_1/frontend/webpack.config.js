const path = require('path'),
	Webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
	CopyPlugin = require('copy-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const PATHS = {
	frontend: path.join(__dirname),
	dist: path.join(__dirname, '../dist')
};

module.exports = {
	externals: {
		paths: PATHS
	},
	entry: {
		app: `${PATHS.frontend}/js/app.js`
	},

    output: {
        filename: 'js/[name].[hash].js',
		path: PATHS.dist
    },

    devServer: {
        port: 9999,
        hot: true,
        open: true
    },

    devtool: 'source-map',

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
                            presets: [
                                '@babel/preset-env'
                            ]
                        }
                    },
                    'eslint-loader'
                ]
            },
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
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
								config:  {
									plugins: [
										require('autoprefixer'),
										require('css-mqpacker'),  // собирает все медиа в один соответсвующий
										require('cssnano')({  // минимизирует
											preset: [
												'default', {
													discardComments: {
														removeAll: true
													}
												}
											]
										})
									]
								}
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
				test: /\.(png|jpg|jpeg|gif|svg|webp)$/,
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
                                `${PATHS.frontend}/js/helpers/handlebars`
                            ]
                        }
                    }
                ]
            }
        ]
    },

    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin(),
            new UglifyJsPlugin()
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: `${PATHS.frontend}/index.html`,
            filename: 'index.html',
			path: PATHS.dist,
            minify: {
                useShortDoctype: true,
                removeStyleLinkTypeAttributes: true,
                removeScriptTypeAttributes: true,
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true
            }
        }),
		new HtmlWebpackPlugin({
			template: `${PATHS.frontend}/img/global-sprite.html`,
			filename: 'img/global-sprite.html',
			path: PATHS.dist,
			minify: {
				collapseWhitespace: true
			}
		}),
		new HtmlWebpackPlugin({
			template: `${PATHS.frontend}/img/chars-sprite.html`,
			filename: 'img/chars-sprite.html',
			path: PATHS.dist,
			minify: {
				collapseWhitespace: true
			}
		}),
		new CopyPlugin({
			patterns: [
				{ from: `${PATHS.frontend}/img`, to: `${PATHS.dist}/img` }
			]
		}),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash].css',
			path: PATHS.dist
        }),
        new Webpack.HotModuleReplacementPlugin()
    ]
};
