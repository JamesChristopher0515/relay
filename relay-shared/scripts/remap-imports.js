#!/usr/bin/env node
const glob = require('glob')
const fs = require('fs')
const path = require('path')

glob.sync('./src/**/*.ts').forEach(srcFile => {
  const contents = fs.readFileSync(srcFile, 'utf8')
  const newContents = contents.replaceAll(
    /'relay-shared([^']+)'/g,
    (wholeMatch, absolutePath, loc) => {
      const dest = `./src${absolutePath}`
      return `'${path.relative(srcFile, dest).slice(3)}'`
    }
  )

  if (newContents !== contents) {
    console.log(`Replaced ${srcFile}`)
    fs.writeFileSync(srcFile, newContents)
  } else {
    console.log(srcFile, 'no change')
  }
})
// For each file in src
