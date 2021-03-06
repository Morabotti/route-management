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

function mapEnvironmentVariables(list) {
  const currentPath = path.join(__dirname);
  const basePath = currentPath + '/../.env';
  const fileEnv = dotenv.config({ path: basePath }).parsed || {};

  const envKeys = list.reduce((prev, next) => {
    prev[`process.env.${next}`] = fileEnv[next]
      ? JSON.stringify(fileEnv[next])
      : process.env[next]
        ? JSON.stringify(process.env[next])
        : '"null"'
    return prev
  }, {})
  
  return envKeys;
}

module.exports = {
  resolveTsconfigPathsToAlias,
  mapEnvironmentVariables
}
