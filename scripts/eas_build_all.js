#!/usr/bin/env node

import prompts from 'prompts'
import semver from 'semver'
import fs from 'fs'
import { execaCommandSync, execaSync } from 'execa'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const androidVersionFilePath = 'androidversion'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

;(async () => {
  const packageJson = JSON.parse(
    fs.readFileSync(new URL('../package.json', import.meta.url))
  )
  const currentVersion = packageJson.version
  const bumpChoices = ['patch', 'minor', 'major', 'custom']

  const response = await prompts([
    {
      type: 'select',
      name: 'bumpType',
      message: 'Choose the type of version bump:',
      choices: bumpChoices.map((value) => ({ value, title: value })),
    },
    {
      type: (prev) => (prev === 'custom' ? 'text' : null),
      name: 'customVersion',
      message: 'Enter the new custom version:',
      validate: (input) => {
        if (semver.valid(input)) return true
        return 'Invalid version'
      },
    },
  ])

  const newVersion =
    response.bumpType === 'custom'
      ? response.customVersion
      : semver.inc(currentVersion, response.bumpType)

  if (!newVersion || !semver.valid(newVersion)) {
    throw new Error('Invalid version')
  }
  packageJson.version = newVersion

  fs.writeFileSync(
    new URL('../package.json', import.meta.url),
    JSON.stringify(packageJson, null, 2)
  )

  const currentAndroidVersion = parseInt(
    fs.readFileSync(androidVersionFilePath, 'utf8')
  )
  const newAndroidVersion = currentAndroidVersion + 1
  fs.writeFileSync(androidVersionFilePath, newAndroidVersion.toString())

  console.log(
    `Building new application version (v${newVersion} - build ${newAndroidVersion})`
  )

  const platforms = ['ios', 'android']

  for (const platform of platforms) {
    console.log(`\nRunning EAS Build for Production on ${platform}...`)
    const productionCmd = `eas build --profile production --auto-submit --platform ${platform} --non-interactive --no-wait`
    await execaCommandSync(productionCmd, {
      stdio: 'inherit',
    })

    console.log(`\nRunning EAS Build for Preview on ${platform}...`)
    const previewCmd = `eas build --profile preview --platform ${platform} --non-interactive --no-wait`
    await execaCommandSync(previewCmd, {
      stdio: 'pipe',
    })
  }
})()
