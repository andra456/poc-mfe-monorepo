// webpack.config.js
const path = require('path');

module.exports = {
    mode: 'production',
    target: 'node',
    entry: './server/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build/server'),
    },
    // Additional configuration goes here
};
