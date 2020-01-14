const path = require('path');

module.exports = {
  entry: "./src/index.ts",
  target: "node",
  mode: "development",
  output: {
    filename: "index.ts",
    path: path.resolve(__dirname, "/dist/v1"),
  },
  module: {
    rules: [
      {
        test: /tsx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          option: {
            presets: ["@babel/preset-env"],
          }
        }
      }
    ]
  }
}