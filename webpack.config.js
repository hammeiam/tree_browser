module.exports = {

	entry: './src/index.js',
	resolve: {
    extensions: ["", ".js", ".jsx"]
  },
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel',
				exclude: /node_modules/
			},
			{
        test: /\.jsx?$/,
        loader: 'eslint'
      },
      {
				test: /\.less$/,
				loader: 'style!css!less'
			}
		]
	}
}