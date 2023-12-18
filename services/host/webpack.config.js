const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;

const MODE = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
};

module.exports = (env, { mode }) => {
  const prod = path.resolve(__dirname, '../../build/container-host/');
  return {
    mode: 'development',
    devtool: 'hidden-source-map',
    entry: './src/index.js',
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.html'],
    },
    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].chunk.bundle.js',
      path: mode === MODE.DEVELOPMENT ? path.resolve(__dirname, 'build') : prod,
      publicPath: 'http://localhost:3004/',
      clean: true,
    },
    performance: {
      maxEntrypointSize: Infinity,
      maxAssetSize: 1024 ** 2,
    },

    devServer: {
      host: 'localhost',
      port: 3004,
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
          test: /\.html$/i,
          loader: 'html-loader',
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: 'host',
        filename: 'remoteEntry.js',
        remotes: {
          host: 'host@http://localhost:3004/remoteEntry.js',
          remote: 'remote@http://localhost:3003/remoteEntry.js',
          customize: 'customize@http://localhost:3009/remoteEntry.js',
          next: 'next@http://localhost:8081/_next/static/chunks/remoteEntry.js',
        },
        exposes: {
          './loader': './src/components/common/loader.tsx',
          './langProvider': './src/libs/strorageDb/i18n.ts',
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
