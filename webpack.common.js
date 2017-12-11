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
      : 'bundle.js'
  },
  resolve: {
    alias: {
      images: path.resolve(__dirname, 'public/images/'),
      styles: path.resolve(__dirname, 'src/styles/'),
      components: path.resolve(__dirname, 'src/components/'),
      containers: path.resolve(__dirname, 'src/containers/'),
      constants: path.resolve(__dirname, 'src/constants/'),
      pages: path.resolve(__dirname, 'src/pages/'),
      utils: path.resolve(__dirname, 'src/utils/')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /src/,
        use: 'babel-loader'
      },
      // for loading bootstrap css
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'node_modules/bootstrap/'),
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
      title: 'CineCube',
      template: './public/index.html',
      favicon: './public/favicon.ico',
      hash: true,
      filename: 'index.html'
    })
  ]
}