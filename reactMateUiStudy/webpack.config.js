const HtmlWebpackPlugin = require("html-webpack-plugin");

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
	template: `${__dirname}/src/index.html`,
	filename: "index.html",
	inject: "body"
})

module.exports = {

	entry: [
		"./src/index.js"
	],
	output: {
		path: `${__dirname}/dist`,
		filename: 'index_bundle.js',
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
		}, {
			test: /\.(png|jpg|gif|svg)$/,
			loader: 'url',
			query: {
				limit: 8192,
				name: '[path][name].[ext]?[hash:7]'
			}
		}]
	},
	devServer: {
		inline: true,
		port: 4321
	},
	plugins: [HTMLWebpackPluginConfig]

}