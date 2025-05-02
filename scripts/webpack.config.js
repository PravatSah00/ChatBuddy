const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const { merge } = require('webpack-merge');
const path = require('path');

module.exports = merge(defaultConfig, {
  resolve: {
    alias: {
      '@public': path.resolve(__dirname, 'src/public'),
      '@admin': path.resolve(__dirname, 'src/admin'),
    },
  },
});
