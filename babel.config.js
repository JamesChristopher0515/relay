const MTYKTransform = require('@mtyk/frontend/babel')
require('dotenv-flow').config()
const path = require('path')
const createResolvePath = require('babel-plugin-tsconfig-paths-module-resolver/create-resolve')
const defaultResolvePath = createResolvePath()

function customResolvePath(sourcePath, currentFile, opts) {
  // Fix for libraries that are still using ViewPropTypes
  if (
    sourcePath === 'react-native' &&
    !currentFile.includes('node_modules/react-native/') &&
    !currentFile.includes('resolver/react-native')
  ) {
    // console.log(
    //   `Loading ${sourcePath} react-native from ${currentFile} using custom resolver`
    // )
    return path.resolve(__dirname, 'resolver/react-native')
  }

  // Maintain the logic from tsconfig-paths-module-resolver
  return defaultResolvePath(sourcePath, currentFile, opts)
}

module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      MTYKTransform({ environment: 'native', logger: { exclude: [/useApi/] } }),
      [
        'tsconfig-paths-module-resolver',
        {
          root: ['.'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          resolvePath: customResolvePath,
        },
      ],
      'transform-inline-environment-variables',
    ],
  }
}
