const path = require('path')
const dotenv = require('dotenv');
const tsconfig = require('./tsconfig.json')

function resolveTsconfigPathsToAlias() {
  const { paths } = tsconfig.compilerOptions
  const aliases = {}

  Object.keys(paths).forEach(item => {
    const key = item.replace('/*', '')
    const value = path.resolve(
      __dirname,
      paths[item][0].replace('/*', '').replace('*', '')
    )
    if (!aliases.hasOwnProperty(key)) {
      aliases[key] = value
    }
  })

  return aliases
}

function mapEnvironmentVariables() {
  const currentPath = path.join(__dirname);
  const basePath = currentPath + '/.env';
  const fileEnv = dotenv.config({ path: basePath }).parsed;

  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return envKeys;
}

module.exports = {
  resolveTsconfigPathsToAlias,
  mapEnvironmentVariables
}
