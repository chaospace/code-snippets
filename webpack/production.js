const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { sourcePath, nodeModules } = require("./const");
const config = {
  output: {
    filename: "static/js/[name].[contenthash:8].js",
    chunkFilename: "static/js/[name].[contenthash:8].chunk.js",
    assetModuleFilename: "static/media/[name].[hash][ext]",
    // 소스맵 위치 설정( 개발 시는 로컬 파일경로를 연결)
    devtoolModuleFilenameTemplate: info =>
      path.relative(sourcePath, info.absoluteResourcePath).replace(/\\/g, "/")
  },
  optimization: {
    minimize: true,
    minimizer: [(new TerserPlugin(), new CssMinimizerPlugin())],
    concatenateModules: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
          options: {
            exclude: [/node_modules/],
            cacheDirectory: true
          }
        }
      },
      {
        test: /(\.module)?.(sass|s.?css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
              modules: {
                auto: /\.module.(sass|s?css)$/,
                exportLocalsConvention: "camelCaseOnly"
              }
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: false,
              //additionalData: "@use '@/assets/styles/config';",
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:8].css",
      chunkFilename: "static/css/[name].[contenthash:8].chunk.css"
    })
  ]
};

module.exports = config;
