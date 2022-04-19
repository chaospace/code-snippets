const fs = require("fs");
const { resolve } = require("path");
const webpack = require("webpack");
//new webpack.HotModuleReplacementPlugin();

// project root경로
const rootDir = fs.realpathSync(process.cwd());
// rootDir를 기준으로 상대경로 제공
const resolvePath = path => resolve(rootDir, path);
const sourcePath = resolvePath("src");
const outputPath = resolvePath("dist");
const entryFilePath = resolvePath("src/index.tsx");
const publicAssetPath = resolveApp("public");
const indexTemplatePath = resolveApp("public/index.html");
module.exports = {
  entry: {
    app: entryFilePath
  },
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
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
          options: {
            exclude: [/node_modules/],
            cacheDirectory: true,
            plugins: [
              isDevelopment && require.resolve("react-refresh/babel")
            ].filter(Boolean)
            //babelrc: true
          }
        }
      },
      {
        test: /(\.module)?.(sass|s.?css)$/,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: isDevelopment,
              importLoaders: 2,
              modules: {
                auto: /\.module.(sass|s?css)$/,
                exportLocalsConvention: "camelCaseOnly"
              }
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
              //additionalData: "@use '@/assets/styles/config';",
              sassOptions: {
                outputStyle: "compressed",
                includePaths: [nodeModules]
              }
            }
          }
        ]
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
  }
};
