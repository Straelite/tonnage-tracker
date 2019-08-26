// Imports: Dependencies
const path = require('path');
require("babel-register");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


// Webpack Configuration
const config = {
  mode: 'development',
  // Entry
  entry: './src/js/app.js',
  // Output
  output: {
    path: path.resolve(__dirname, 'public/'),
    filename: 'app-bundle.js',
    publicPath: '/public/'
  },
  // Loaders
  module: {
    rules: [
      // JavaScript/JSX Files
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // CSS Files
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  },  
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  // Plugins
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Track Your Lifts',
      template: './src/index.html',
      hash: true,
      filename: './index.html'
    }),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000,
    inline: true,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true,
    },
  }
};
// Exports
module.exports = config;