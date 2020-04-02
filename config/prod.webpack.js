
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const MediaQueryPlugin = require('media-query-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin}  = require('clean-webpack-plugin');
const basePath = path.resolve(__dirname, './../src')
const build_folder = path.resolve(__dirname, '../', 'build');
const assets = path.resolve(__dirname, '../', 'build', 'assets');

module.exports = {
	stats:{
		children: false
	},
	mode: 'production',
	context: build_folder,
	entry: {
		main: path.join(basePath, 'index.js'),
	},

	output: {
		path: path.join(build_folder),
		publicPath: '/',
		filename: 'assets/js/[name].js',
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
					{ 
						loader: MiniCssExtractPlugin.loader ,
						options: {
							url: true,
							importLoaders: 2
						}
					},
					{ loader: 'css-loader', options: { url: true, sourceMap: true } },

					MediaQueryPlugin.loader,

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
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				loader: 'file-loader',
				options: {
					outputPath: 'assets/images/',
					
				  },
			},
			{
			test: /\.(woff|woff2|eot|ttf|otf)$/i,
			use: [
			  {
				loader: 'file-loader',
				options: {
				  	name: './assets/fonts/[contenthash].[ext]',
				},
			  },
			],
		}
		
		]
	},
	plugins: [

		new CleanWebpackPlugin(),

		new CopyWebpackPlugin([
			{ 
				from: path.join(basePath, 'assets/icons/'), 
				to: './assets/icons'
			},
			{ 
				from: path.join(basePath, 'assets/favicon.ico'), 
				to: './assets/'
			},
		]),



	


		new OptimizeCssAssetsPlugin({


		}),
		new MiniCssExtractPlugin({
			filename: 'assets/css/[name].css'
		}),
				
		new HtmlPlugin({
			
			template: path.join(basePath, 'template.html'),
		})



	],

	optimization: {

        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    warnings: false,
                    output: {
                        comments: false
                    },
                    compress: {
                        drop_console: true
                    },
                },
                extractComments: false,
            }),
            new OptimizeCssAssetsPlugin()
        ]
	},
	
    resolve: {
       
		alias: {
		  "react": "preact/compat",
		  "react-dom": "preact/compat"
		}
	  
	},




};