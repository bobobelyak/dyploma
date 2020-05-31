const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-transform-react-jsx'],
          },
        },
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif|woff|woff2|otf|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name]-[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.DefinePlugin({
      API_BASE: process.env.NODE_ENV === 'production' ? JSON.stringify('https://explore-lviv-server.herokuapp.com') : JSON.stringify(process.env.API_BASE || 'http://localhost:3030'),
    }),
    new Dotenv(),
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true,
  },
  resolve: {
    extensions: ['*', '.jsx', '.js'],
  },
};
