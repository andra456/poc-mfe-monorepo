const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;
const Dotenv = require('dotenv-webpack');

const MODE = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
};
const prod = path.resolve(__dirname, '../../build/customize-react/');

module.exports = (env, { mode }) => {
    return {
        mode: MODE.DEVELOPMENT,
        devtool: 'inline-source-map',
        entry: './src/index.js',
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.jsx', '.html'],
        },
        output: {
            filename: '[name].bundle.js',
            chunkFilename: '[name].chunk.bundle.js',
            path: mode === MODE.DEVELOPMENT ? path.resolve(__dirname, 'build') : prod,
            publicPath: 'http://localhost:3009/',
        },
        performance: {
            maxEntrypointSize: Infinity,
            maxAssetSize: 1024 ** 2,
        },

        devServer: {
            host: 'localhost',
            port: 3009,
            historyApiFallback: true,
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.svg$/,
                    loader: 'svg-inline-loader',
                },
                {
                    test: /\.?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|jp(e*)g|gif|webp|avif)$/,
                    use: ['file-loader'],
                },
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack'],
                },
                {
                    test: /\.html$/i,
                    loader: 'html-loader',
                },
            ],
        },

        plugins: [
            new ModuleFederationPlugin({
                name: 'customize',
                filename: 'remoteEntry.js',
                remotes: {
                    host: 'host@http://localhost:3004/remoteEntry.js',
                },
                exposes: {
                    './routes': './src/mapping',
                },
                shared: {
                    ...deps,
                    react: {
                        singleton: true,
                        import: 'react',
                        shareScope: 'default',
                        requiredVersion: deps.react,
                        eager: true,
                    },
                    'react-dom': {
                        singleton: true,
                        requiredVersion: deps['react-dom'],
                        eager: true,
                    },
                },
            }),
            new HtmlWebpackPlugin({
                template: './src/index.html',
            }),
            new Dotenv(),
        ],
    };
};
