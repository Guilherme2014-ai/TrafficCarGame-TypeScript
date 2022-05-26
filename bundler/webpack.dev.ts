/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ip from "internal-ip";
import { resolve } from "path";
import { merge } from "webpack-merge";
import portFinderSync from "portfinder-sync";
const commonConfiguration = require("./webpack.main.config");

const infoColor = (_message) => {
  return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`;
};

const distDirectory = resolve(__dirname, "..", "dist");

module.exports = merge(commonConfiguration, {
  mode: "development",
  devServer: {
    host: "0.0.0.0",
    port: portFinderSync.getPort(8080),

    static: {
      directory: distDirectory,
    },
    compress: true,
    watchFiles: distDirectory,
    open: distDirectory,
    https: false,
    onListening: function (server) {
      const port = server.options.port;
      const https = server.options.https ? "s" : "";
      const localIp = ip.v4.sync();
      const domain1 = `http${https}://${localIp}:${port}`;
      const domain2 = `http${https}://localhost:${port}`;

      console.log(
        `Project running at:\n  - ${infoColor(domain1)}\n  - ${infoColor(
          domain2,
        )}`,
      );
    },
  },
});
