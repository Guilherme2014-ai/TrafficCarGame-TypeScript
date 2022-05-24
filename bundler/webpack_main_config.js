/* eslint-disable @typescript-eslint/no-var-requires */
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { resolve } = require("path");

module.exports = {
  entry: resolve(__dirname, "../src/index.ts"),
  output: {
    filename: "bundle.[contenthash].js",
    path: resolve(__dirname, "../dist"),
  },
  mode: "production",
  devtool: "source-map",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve(__dirname, "..", "static"),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "../src/index.html"),
      minify: true,
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      // HTML
      {
        test: /\.html$/,
        use: ["html-loader"],
      },

      // JS
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-typescript"],
        },
      },

      // CSS
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          "style-loader",
        ],
      },

      // Images
      {
        test: /\.(jpg|png|gif|svg)/,
        use: [
          {
            loader: "file-loader",
            options: { outputPath: "assets/images/" },
          },
        ],
      },
    ],
  },
};
