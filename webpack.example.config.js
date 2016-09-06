module.exports = {
    entry: './example/app.js',
    output: {
        path: './bin',
        filename: 'example.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            {
                test: /\.html$/,
                loader: "file?name=[name].[ext]"
            }
        ],

    }
};
