const fs = require("fs");
const { resolve, relative } = require("path");
// project root경로
const rootDir = fs.realpathSync(process.cwd());
// rootDir를 기준으로 상대경로 제공
function resolvePath(path) {
  return resolve(rootDir, path);
}
const sourcePath = resolvePath("src");
const outputPath = resolvePath("dist");
const entryFilePath = resolvePath("./src/index.tsx");
const publicAssetPath = resolvePath("public");
const indexTemplatePath = resolvePath("public/index.html");
const nodeModules = relative(__dirname, "node_modules");
module.exports = {
  rootDir,
  sourcePath,
  outputPath,
  entryFilePath,
  publicAssetPath,
  indexTemplatePath,
  nodeModules
};
