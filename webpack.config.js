const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')


const isDev = process.env.NODE_ENV === 'development'

const config = {
	entry: './src/main.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js?/,
				exclude:/(node_modules)/,
                include:/(src)/,
				loader:'babel-loader'
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{ loader: 'css-loader', options: { importLoaders: 1 } },
					{
                      loader: 'postcss-loader',
                      options: {
                        ident: 'postcss',
                        config: {
                        	path: './postcss.config.js'
                        }
                      }
                    }
				]
			},
			{
                test: /\.(gif|jpg|png|jpeg|svg)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit:1024,
                            name:'assets/images/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name:'style/fonts/[name].[ext]'
                        }
                    }
                ]
            }
		]
	},
	plugins: [
		new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
		new HtmlWebpackPlugin({
			template: './index.html',
			filename: 'index.html'
		})
	]
}

if(isDev) {
	config.module.rules.push({
        test: /\.scss$/,
        use:[
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
        ]
    })

	config.devServer = {
        contentBase : __dirname,
        open:true,
        port:80,
        overlay: {
            errors: true
        }
    }
} else {
    //config.output.filename = '[name].[chunkhash:8].js'
	config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push({
        test: /\.scss$/,
        use: ExtractTextWebpackPlugin.extract({
            fallback: 'style-loader',
            use: [
            	'css-loader', 
            	{
                  loader: 'postcss-loader',
                  options: {
                    ident: 'postcss',
                    config: {
                    	path: './postcss.config.js'
                    }
                  }
                },
            	'sass-loader'
            ]
        })
    })
    config.plugins.push(
    	new ExtractTextWebpackPlugin('style.css')
    )
}

module.exports = config