const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const deps = require('./package.json').dependencies;
const MODE = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
};
const prod = path.resolve(__dirname, '../../build/remote-react');

module.exports = (env, { mode }) => {
  return {
    entry: './src/index',
    mode: 'development',
    devtool: 'hidden-source-map',
    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].chunk.bundle.js',
      publicPath: mode === MODE.DEVELOPMENT ? 'http://localhost:3003/' : '/remote-react/',
      path: mode === MODE.DEVELOPMENT ? path.resolve(__dirname, 'build') : prod,
      clean: true,
    },
    devServer: {
      port: 3003,
      historyApiFallback: true,
    },
    resolve: {
      extensions: ['.jsx', '.js', '.json', '.css', '.scss', '.jpg', '.jpeg', '.png'],
    },
    module: {
      rules: [
        {
          test: /\.(jpg|png|gif|jpeg)$/,
          loader: 'url-loader',
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'remote',
        filename: 'remoteEntry.js',
        exposes: {
          './bridge': './src/bridge',
          './multilang': './src/multiLang',
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
        template: './public/index.html',
      }),
    ],
  };
};
