const {sourcePath, indexTemplatePath, nodeModules} = require('./const');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const config = {
  output: {
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    assetModuleFilename: 'static/media/[name].[hash][ext]',
    // 소스맵 위치 설정( 개발 시는 로컬 파일경로를 연결)
    devtoolModuleFilenameTemplate: info => path.relative(sourcePath, info.absoluteResourcePath).replace(/\\/g, '/')
  },
  optimization: {
    minimize: true,
    minimizer: [(new TerserPlugin(), new CssMinimizerPlugin())],
    concatenateModules: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
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
            loader: 'css-loader',
            options: {
              sourceMap: false,
              modules: {
                auto: /\.module.(sass|s?css)$/,
                exportLocalsConvention: 'camelCaseOnly'
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
              //additionalData: "@use '@/assets/styles/config';",
              sassOptions: {
                outputStyle: 'compressed',
                includePaths: [nodeModules]
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateParameters: {
        PUBLIC_URL: ''
      },
      template: indexTemplatePath,
      title: '코드모음',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true
        }
      },
      async: false,
      devServer: false
    })
  ]
};

module.exports = config;
