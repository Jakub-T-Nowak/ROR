// webpack.config.js
const path = require( 'path' );
module.exports = {
    context: __dirname,
    entry: './public/index.js',
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'main.js',
    },
    resolve: {
        alias: {
            'services': path.resolve(__dirname, 'public/services/'),
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            }
        ]
    }
};