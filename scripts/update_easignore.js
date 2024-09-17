#!/usr/bin/env node

import fs from 'fs'

const modifiedGitignore = fs
  .readFileSync('.gitignore')
  .toString()
  .split('\n')
  .filter((_line) => {
    // Any logic to exclude/include specific gitignore items for eas here
    return true
  })

fs.writeFileSync(`.easignore`, modifiedGitignore.join('\n'))
