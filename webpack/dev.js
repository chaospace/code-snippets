// development config
const { publicAssetPath, nodeModules } = require("./const");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const path = require("path");

module.exports = {
  output: {
    filename: "static/js/bundle.js",
    chunkFilename: "static/js/[name].chunk.js",
    assetModuleFilename: "static/media/[name].[hash][ext]",
    // 소스맵 위치 설정( 개발 시는 로컬 파일경로를 연결)
    devtoolModuleFilenameTemplate: info => {
      
      return path.resolve(info.absoluteResourcePath).replace(/\\/g, "/");
    }
  },
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*"
    },
    static: {
      directory: publicAssetPath,
      publicPath: "/"
    },
    historyApiFallback: { index: "/" },
    allowedHosts: "all",
    compress: true,
    host: "localhost",
    port: "8080",
    https: false,
    open: true
  },
  devtool: "cheap-module-source-map",
  optimization: {
    minimize: false,
    concatenateModules: false
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
          options: {
            exclude: [/node_modules/],
            cacheDirectory: true,
            plugins: [require.resolve("react-refresh/babel")]
          }
        }
      },
      {
        test: /(\.module)?.(sass|s.?css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: {
                auto: /\.module.(sass|s?css)$/,
                exportLocalsConvention: "camelCaseOnly"
              }
            }
          },
          {
            loader: "sass-loader",
            options: {
              //additionalData: "@use '@/assets/styles/config';",
              sourceMap: true,
              sassOptions: {
                outputStyle: "compressed",
                includePaths: [nodeModules]
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [new ReactRefreshPlugin()]
};
