const path = require("path");
const sass = require("node-sass");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const rules = [
  {
    test: /\.tsx?/,
    exclude: /node_modules/,
    loader: "babel-loader",
  },
  {
    test: /\.css$/,
    loader: "style-loader!css-loader",
  },
  {
    test: /\.s[ac]ss$/i,
    use: [
      "style-loader",
      "css-loader",
      {
        loader: "sass-loader",
        options: {
          // this use node-sass
          implementation: sass,
        },
      },
    ],
  },
];

module.exports = {
  target: "web",
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  module: { rules },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve("./index.html"),
    }),
  ],
  resolve: { extensions: [".ts", ".tsx", ".js"] },
  devServer: {
    // for production
    // contentBase: "./build",
    contentBase: "./",
    port: 5000,
  },
};
