const {
  rootDir,
  outputPath,
  sourcePath,
  entryFilePath,
  publicAssetPath,
  indexTemplatePath
} = require("./const");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: entryFilePath
  },
  //context: rootDir,
  output: {
    clean: true, // 이전 파일 제거
    path: outputPath,
    publicPath: "/"
  },
  resolve: {
    modules: ["node_modules"],
    alias: {
      "@": sourcePath,
      process: "process/browser"
    },
    extensions: [".ts", ".tsx", ".js", ".scss", ".svg", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        type: "javascript/auto"
      },
      {
        type: "asset",
        resourceQuery: /url/ // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: "removeViewBox",
                    active: false
                  }
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|woff|woff2|eot|ttf|otf|ico)$/i,
        type: "asset"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({}),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${publicAssetPath}/**/*`,
          to: `${outputPath}/[name][ext]`,
          filter: resource => {
            return resource !== indexTemplatePath;
          }
        }
      ]
    }),
    new HtmlWebpackPlugin({
      templateParameters: {
        PUBLIC_URL: ""
      },
      template: indexTemplatePath,
      title: "코드모음"
    })
  ]
};
