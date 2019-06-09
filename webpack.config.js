// Imports: Dependencies
const path = require('path');
require("babel-register");
// Webpack Configuration
const config = {
  
  // Entry
  entry: './src/app.js',
  // Output
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'bundle.js',
  },
  // Loaders
  module: {
    rules : [
      // JavaScript/JSX Files
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // CSS Files
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  // Plugins
  plugins: [],
  watch: true,
  devtool: 'source-map',
};
// Exports
module.exports = config;