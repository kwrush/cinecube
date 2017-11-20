const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname),
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: process.env.NODE_ENV === 'production' 
      ? 'bundle-[hash].js' 
      : 'bundle.js'
  },
  resolve: {
    alias: {
      images: path.resolve(__dirname, 'public/images/'),
      styles: path.resolve(__dirname, 'src/styles/'),
      components: path.resolve(__dirname, 'src/components/'),
      containers: path.resolve(__dirname, 'src/containers/'),
      constants: path.resolve(__dirname, 'src/constants/')
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
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
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