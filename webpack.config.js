const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    app: ['@babel/polyfill', path.resolve(__dirname, "src/index.tsx")],
    frame: ['@babel/polyfill', path.resolve(__dirname, "src/frame/index.tsx")]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].index.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".css"],
    fallback: {
      fs: require.resolve("memfs"),
      stream: require.resolve("stream-browserify"),
      buffer: require.resolve("buffer"),
      path: require.resolve("path-browserify"),
      assert: require.resolve("assert-browserify"),
      os: require.resolve('os-browserify'),
      constants: require.resolve('constants-browserify'),
      process: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|ttf)$/i,
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
      template: path.resolve(__dirname, "src/index.ejs"),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MonacoWebpackPlugin()
  ],
  devServer: {
    hot: true,
    quiet: true,
    contentBase: path.resolve(__dirname, "dist")
  },
  watchOptions: {
    poll: true,
    ignored: /node_modules/
  }
};