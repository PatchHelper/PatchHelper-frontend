const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = () => {
  const dotenvFilename = '.env';

  return {
  mode: 'development', // or 'development'
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build/static'),
    publicPath: '/static/', // Make sure this matches STATIC_URL in Django settings
  },
  plugins: [
    new BundleTracker({ filename: 'webpack-stats.json' }),
    new HtmlWebpackPlugin({
        template: 'public/index.html',
        inject: 'body',
        scriptLoading: 'defer'
      }),
    new Dotenv({
      path: dotenvFilename,
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        loader: 'file-loader',
    }      
    ],
  }
}};