const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin} = require('webpack').container
const packageJson = require('./package.json')
module.exports = {
  output: {
    path: path.join(__dirname, "/dist"), // the bundle output path
    filename: "app2.js", // the name of the bundle
  },
  plugins: [
    new ModuleFederationPlugin({
        name : 'app2',
        filename:'remoteEntry.js',
        exposes : {
          './App2' : './src/App.js'
        },
        shared: packageJson.dependencies
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html", // to import index.html file inside index.js
    }),
  ],
  devServer: {
    port: 8001, // you can change the port
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // .js and .jsx files
        exclude: /node_modules/, // excluding the node_modules folder
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(sa|sc|c)ss$/, // styles files
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
        loader: "url-loader",
        options: { limit: false },
      },
    ],
  },
};