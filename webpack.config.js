const path = require('path');
const DIST_DIR = path.join(__dirname, 'public/dist');

module.exports = {
    mode: 'development',
    entry: './src/components/index.js',
    output: {
        filename: 'bundle.js',
        path: DIST_DIR,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: [/\.jsx$/],
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'file-loader',
            },
            {
                test: [/\.svg$/],
                use: {
                    loader: 'url-loader',
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};
