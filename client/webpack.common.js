const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: process.env.NODE_ENV === 'production' 
      ? 'bundle-[hash].js' 
      : 'bundle.js',
  },
  resolve: {
    alias: {
      images: path.resolve(__dirname, 'public/images/'),
      styles: path.resolve(__dirname, 'public/styles/'),
      components: path.resolve(__dirname, 'src/components/'),
      containers: path.resolve(__dirname, 'src/containers/'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /src/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 40000,
            name: '[path][hash].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Cinematify',
      template: './public/index.html',
      favicon: './public/favicon.ico',
      hash: true,
      filename: 'index.html'
    })
  ]
}