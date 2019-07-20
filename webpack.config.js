// Imports: Dependencies
const path = require('path');
require("babel-register");
const webpack = require('webpack'); 
// Webpack Configuration
const config = {
  mode: 'development',
  // Entry
  entry: './src/app.js',
  // Output
  output: {
    path: path.resolve(__dirname, 'public/'),
    filename: 'bundle.js',
  },
  // Loaders
  module: {
    rules : [
      // JavaScript/JSX Files
      {
        test: /\.(js|jsx)$/,
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
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  // Plugins
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],  
  watch: true,
  devtool: 'source-map'
};
// Exports
module.exports = config;