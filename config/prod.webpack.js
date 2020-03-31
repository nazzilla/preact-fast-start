
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')



const basePath = path.resolve(__dirname, './../src')
const build_folder = path.resolve(__dirname, '../', 'build');
const assets = path.resolve(__dirname, '../', 'build', 'assets');

module.exports = {
	mode: 'production',
	context: build_folder,
	entry: {
		main: path.join(basePath, 'index.js'),
	},

	output: {
		path: path.join(build_folder),

		filename: 'assets/[name].js',
	},

	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {

						"presets": [
							"@babel/preset-env",
							"@babel/preset-react"
						],

						"plugins": [
							[
								"@babel/plugin-transform-react-jsx",
								{
									"pragma": "h",
									"pragmaFrag": "Preact.Fragment"
								}
							],

							"@babel/plugin-proposal-class-properties"
						]
					}
				},

			},

			{
				test: /\.s?css$/,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{ loader: 'css-loader', options: { url: false, sourceMap: true } },
					{ loader: 'sass-loader', options: { sourceMap: true } },
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',

							plugins: [
								require('postcss-preset-env'),
								require('autoprefixer'),
								require('cssnano')({
									"preset": ["default", {
										"discardComments": { "removeAll": true }
									}]
								})
							]


						}
					}
				],
			},

			{
				test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)/,
				use: ['file-loader']
			}]
	},
	plugins: [
		new HtmlPlugin({
			title: 'Preact minimal',
			template: path.join(basePath, 'index.html'),
		}),

		new MiniCssExtractPlugin({
			filename: 'assets/[name].css'
		}),
		new OptimizeCssAssetsPlugin({


		})


	],


	resolve: {
		extensions: ['.js', '.jsx'],
	},

};