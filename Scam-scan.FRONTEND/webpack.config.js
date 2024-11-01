const webpack = require('webpack');

module.exports = {
  experiments: {
    topLevelAwait: true,
  },
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "buffer": require.resolve("buffer/"),
      "stream": require.resolve("stream-browserify"),
      "process": require.resolve("process/browser"),
      "vm": require.resolve("vm-browserify"),  // Ajoute ce polyfill
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
  ],
};
