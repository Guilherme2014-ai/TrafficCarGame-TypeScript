/* eslint-disable @typescript-eslint/no-var-requires */
import { merge } from "webpack-merge";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
const commonConfiguration = require("./webpack.main.config.js");

module.exports = merge(commonConfiguration, {
  mode: "production",
  plugins: [new CleanWebpackPlugin()],
});
