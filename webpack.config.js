let path = require('path');

let ExtractTextPlugin = require("extract-text-webpack-plugin");
let HtmlWebpackPlugin = require('html-webpack-plugin');

let conf = {
	entry: './src/js/index.js',
	output: {
		//path: path.resolve(__dirname, './dist'),
        path: path.join(__dirname, '/dist/'),
		filename: 'main.js',
		publicPath: '/dist/'
	},
	devServer:{
		//overlay: true,
        //contentBase: path.join(__dirname, '/dist/'),
        //compress: true,
        //port: 9001,
        //stats: 'errors-only',
        //open: false,
        //hot: true,
        //inline: true,
        //watchContentBase: true,
        //watchOptions: {
        //    poll: true
        //}
	},
	module: {
        rules: [
        	{
            	test: /\.(js|jsx)$/,
            	exclude: '/(node_modules|bower_components)/',
            	use: {
            	    loader: 'babel-loader',
            	    options: {
            	        presets: ['es2015']
            	    }
            	}
        	},
        	{
        		test: /\.css$/,
        		/*use: [
        			'style-loader',
        			'css-loader'
        		] */
        		use: ExtractTextPlugin.extract({
          			fallback: "style-loader",
          			use: "css-loader"
        		})
        	},
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
    	new ExtractTextPlugin("styles.css"),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/html/index.html',
            filename: '../index.html'
        })
  	]
};

module.exports = (env, options) => {
	let production = options.mode === 'production';

	conf.devtool = production 
					? false
					: 'eval-sourcemap';

	return conf;
}