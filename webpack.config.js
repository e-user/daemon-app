const path = require('path')

const jsLoader = 'babel-loader!standard-loader?error=true'

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: 'main.js'
  },
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: jsLoader
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: jsLoader
          }
        }
      },
      {
        test: /\.(s[ac]ss)$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(png|svg)$/,
        use: [
          'file-loader'
        ]
      } 
    ]
  }
}
