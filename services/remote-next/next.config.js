const NextFederationPlugin = require('@module-federation/nextjs-mf/lib/NextFederationPlugin');
const path = require('path');
module.exports = {
  distDir: '../../build/next-customs',
  output: 'standalone',
  experimental: {
    // this includes files from the monorepo base two directories up
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'remote',
          remotes: {},
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            './nextjs-remote-component': './components/nextjs-remote-page.js',
            './nextjs-multilang': './components/multiLang.js',
            './nextjs-remote-page': './pages/index.tsx',
            './dinamic-next': './pages/p/[...slug].tsx',
          },
          shared: {
            react: {
              requiredVersion: false,
              singleton: true,
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
  reactStrictMode: true,
};
