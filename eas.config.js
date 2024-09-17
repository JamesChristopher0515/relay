// JS CONFIG FILES ARE NOT OFFICIALLY SUPPORTED BY EAS,
// THIS IS CONVERTED INTO EAS.JSON AS PART OF A POSTINSTALL SCRIPT

const fs = require('fs')
const path = require('path')
const os = require('os')

const { GOOGLE_SERVICE_JSON_PATH } = process.env
let serviceAccountKeyPath =
  GOOGLE_SERVICE_JSON_PATH ??
  path.join(os.homedir(), '.keys/relay-playstore-submitter.json')
// path.join(os.homedir(), '.keys/wh-play-store-submitter.json')

const { CI: isCI, EAS_BUILD: isEASBuild } = process.env

if (isCI && !isEASBuild) {
  // Running in bitbucket pipeline, need to create Google Service Account JSON from env var
  serviceAccountKeyPath = path.join(__dirname, 'service-account-key.json')
  const jsonStr = GOOGLE_SERVICE_JSON
  try {
    JSON.parse(jsonStr)
  } catch (e) {
    throw new Error(
      `Provided GOOGLE_SERVICE_JSON at path "${GOOGLE_SERVICE_JSON_PATH}" is not valid JSON`
    )
  }
  fs.writeFileSync(serviceAccountKeyPath, jsonStr)
}

const prodEnv = {
  // 2 because originally API_URL was in app.config.js and gets hardcoded into the app
  // API_URL_2: 'https://api.relayapp.co.uk/v1',
  // API_URL_2: 'https://relay-api.mtyk.co.uk/v1',
  //! David Charles
  API_URL: 'https://api.relayapp.co.uk/v1',
  API_URL_2: 'https://api.relayapp.co.uk/v1',
}

module.exports = {
  cli: {
    // version: '3.8.1',
    //! David Charles
    version: '7.6.2',
  },
  build: {
    development: {
      developmentClient: true,
      distribution: 'internal',
      channel: 'development',
      //! David Charles
      env: {
        API_URL: 'https://api.relayapp.co.uk/v1',
        API_URL_2: 'https://api.relayapp.co.uk/v1',
      },
    },
    'development-simulator': {
      developmentClient: true,
      distribution: 'internal',
      ios: {
        simulator: true,
      },
    },
    preview: {
      ios: {
        simulator: true,
      },
      channel: 'production',
      android: {
        buildType: 'apk',
      },
      env: {
        NODE_ENV: 'production',
        ...prodEnv,
      },
    },
    production: {
      env: {
        NODE_ENV: 'production',
        ...prodEnv,
      },
      channel: 'production',
    },
  },
  submit: {
    production: {
      ios: {
        appleTeamId: 'F2M3B2RRU6',
        ascAppId: '1637090305',
      },
      android: {
        track: 'production',
        releaseStatus: 'draft',
        serviceAccountKeyPath,
      },
    },
  },
}
