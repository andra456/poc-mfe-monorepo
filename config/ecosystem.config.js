module.exports = {
  apps: [
    {
      name: 'react',
      script: 'dist/server.js',
    },
    {
      name: 'next',
      script: 'next-customs/standalone/services/customs-next/server.js',
    },
  ],
};
