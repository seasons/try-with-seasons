const path = require("path");
const webpack = require("webpack");

const SRC_DIR = path.resolve(__dirname, "src");
const OUTPUT_PATH = path.resolve(__dirname, "dist");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  target: "web",
  entry: path.resolve(SRC_DIR, "./index.js"),
  output: {
    path: OUTPUT_PATH,
    filename: "try-with-seasons.js",
    library: "TryWithSeasons",
    libraryExport: "default",
  },
  watchOptions: {
    ignored: ["node_modules", "src/**/*.ts"],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["to-string-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
    ],
  },
  plugins: [new webpack.EnvironmentPlugin({ NODE_ENV: "development" })],
};
