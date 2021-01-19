var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
    entry: './app/scripts/main',
    output: {
        filename: 'main.js',
        path: './app/dist'
    },
    module: {
        noParse: [
            /bower_components/,
            /vendor/
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'stage-0']
                }
            }
        ]
    },
    plugins: [
        new ngAnnotatePlugin({
            add: true
        })
    ]
};
