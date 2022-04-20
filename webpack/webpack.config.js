const defaultConfig = require("./common");
const develConfig = require("./dev");
const productionConfig = require("./production");
const { merge } = require("webpack-merge");
//const webpack = require("webpack");
function getConfig(mode) {
  let config = "";
  switch (mode) {
    case "development":
      config = merge(defaultConfig, develConfig, { mode });
      break;
    case "production":
      config = merge(defaultConfig, productionConfig, { mode });
      break;
  }
  //   config.plugins = [
  //     ...config.plugins,
  //     new webpack.DefinePlugin({
  //       env: JSON.stringify(envVariables)
  //     })
  //   ];
  return config;
}

module.exports = (_, options) => {
  const c = getConfig(options.mode);
  return c;
};
