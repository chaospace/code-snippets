// development config
const path = require('path');
const { publicAssetPath,indexTemplatePath, nodeModules } = require("./const");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');


module.exports = {
  output: {
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    assetModuleFilename: 'static/media/[name].[hash][ext]',
    // 소스맵 위치 설정( 개발 시는 로컬 파일경로를 연결)
    devtoolModuleFilenameTemplate: info => {
      return path.resolve(info.absoluteResourcePath).replace(/\\/g, '/');
    }
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*'
    },
    static: {
      directory: publicAssetPath,
      publicPath: '/'
    },
    historyApiFallback: {index: '/'},
    allowedHosts: 'all',
    compress: true,
    host: 'localhost',
    port: '9090',
    https: false,
    open: true,
  },
  devtool: 'cheap-module-source-map',
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
          loader: 'babel-loader',
          options: {
            exclude: [/node_modules/],
            cacheDirectory: true,
            plugins: [require.resolve('react-refresh/babel')]
          }
        }
      },
      {
        test: /(\.module)?.(sass|s.?css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                auto: /\.module.(sass|s?css)$/,
                exportLocalsConvention: 'camelCaseOnly'
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              //additionalData: "@use '@/assets/styles/config';",
              sourceMap: true,
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
      title: '코드모음'
    }),
    new ReactRefreshPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true
        }
      }
    }),
    new ForkTsCheckerNotifierWebpackPlugin({title: 'TypeScript', excludeWarnings: false})
  ]
};
