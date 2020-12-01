const path = require("path");
const webpack = require("webpack");

// webpack entry is tsc outdir
const SRC_DIR = path.resolve(__dirname, "build");

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
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
      MONSOON_ORIGIN: "http://localhost:4000",
      FLARE_ORIGIN: "http://localhost:3000",
    }),
  ],
};
