
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')

const basePath = path.join(__dirname,'../', 'src')

module.exports = {
    mode: 'development',

    entry: {
      main: path.join(basePath, 'index.js'),
    },

    output: {
      path: path.join(basePath, '..', 'build'),
      publicPath: '/' ,
      filename: '[name].js',
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
                                "pragma":"h",
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
              // Creates `style` nodes from JS strings
              'style-loader',
              // Translates CSS into CommonJS
              'css-loader',
              // Compiles Sass to CSS
              'sass-loader'
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
      ],

      
    resolve: {
        extensions: ['.js', '.jsx'],
      },
    devServer: {
        contentBase: basePath,
        compress: true,
        port: 9000,
        stats: 'minimal' //'errors-only'
    }
};