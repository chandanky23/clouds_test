import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const isProduction = !!process.env.NODE_ENV && process.env.NODE_ENV !== 'development'

const webpackConfig: webpack.Configuration = {
  mode: 'development',
  devtool: isProduction ? false : 'inline-source-map',
  entry: path.resolve(__dirname, './app/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: "/"
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      app: path.resolve(__dirname, 'app')
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'app', 'index.html'),
      filename: 'index.html'
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    historyApiFallback: true,
    compress: true,
    hot: true,
    inline: true,
    port: 3000,
    proxy: {
      "/api/*": {
        target: "http://localhost:5000"
      }
    }
  }
}

export default webpackConfig