const NextFederationPlugin = require('@module-federation/nextjs-mf/lib/NextFederationPlugin');

module.exports = {
  distDir: '../../build/next-customs',
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'next',
          remotes: {},
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            './nextjs-remote-component': './components/nextjs-remote-page.js',
            './nextjs-multilang': './components/multiLang.js',
            './nextjs-remote-page': './pages/index.js',
            './dinamic-next': './pages/p/[[...slug]].js',
          },
          shared: {
            next: {
              requiredVersion: false,
              singleton: true,
            },
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
  reactStrictMode: false,
};
