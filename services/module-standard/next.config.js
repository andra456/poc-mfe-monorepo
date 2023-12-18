// const NextFederationPlugin = require('@module-federation/nextjs-mf');
const NextFederationPlugin = require('@module-federation/nextjs-mf/lib/NextFederationPlugin');
const deps = require('./package.json').dependencies;
module.exports = {
  distDir: '../../build/next-remote',

  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'remote-next',
          remotes: {},
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            './nextjs-remote-page': './src/pages/index.tsx',
          },
          shared: {
            react: {
              singleton: true,
              shareScope: 'default',
            },
            'react-dom': {
              singleton: true,
              requiredVersion: false,
            },
          },
          extraOptions: {
            skipSharingNextInternals: true,
          },
        }),
      );
    }
    return config;
  },
  // your original next.config.js export
  reactStrictMode: false,
};
