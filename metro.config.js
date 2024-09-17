const { getDefaultConfig } = require('expo/metro-config')
const exclusionList = require('metro-config/src/defaults/exclusionList')
const path = require('path')

// Find the workspace root, this could be replaced with `find-yarn-workspace-root` (if it worked lol)
// const workspaceRoot = path.join(__dirname, '..')
const projectRoot = __dirname

const config = getDefaultConfig(projectRoot, { exotic: true })

// Ensure all our asset types are handled by the asset resolver
config.resolver.assetExts = [
  'db',
  'mp3',
  'ttf',
  'obj',
  'mtl',
  'png',
  'jpg',
  'm4a',
]

config.watcher.additionalExts = config.watcher.additionalExts ?? []

// 1. Watch all files within the monorepo
// config.watchFolders = [workspaceRoot]

// 2. Let Metro know where to resolve packages, and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  // path.resolve(workspaceRoot, 'node_modules'),
]

// Disable watchman crawler error when blitz folders exist in the workspace
config.resolver.blacklistRE = exclusionList([/.blitz\/.*/, /.yarn\/.*/])

module.exports = config
