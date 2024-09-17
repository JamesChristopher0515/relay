if (!process.env.DOTENV_PROCESSED) {
  // This file seems to get executed mutliple times, so add a meta env variable
  // to stop the onslaught of console messages like this:
  // dotenv-flow: "API_URL" is already defined in `process.env` and will not be overwritten"
  require('dotenv-flow').config({
    // Silent is important as internal eas/expo tooling uses JSON.parse on the stdout
    // and will fail if there is any output
    silent: true,
  })
  process.env.DOTENV_PROCESSED = 'true'
}

const fs = require('fs')
const packageJson = require('./package.json')
const path = require('path')
const androidVersionCode = parseInt(
  fs.readFileSync(path.join(__dirname, 'androidversion'), 'utf8'),
  10
)

const PRODUCT_NAME = 'Relay'
const micPermissions = `Allow ${PRODUCT_NAME} to access your microphone for video calls with your practitioner`
const cameraPermissions = `Allow ${PRODUCT_NAME} to access your camera for video calls with your practitioner`

const packageJsonVersion = packageJson.version
const runtimeVersion = '1.0.2'

export default {
  plugins: [
    'expo-font',
    'react-native-health',
    [
      '@config-plugins/react-native-webrtc',
      {
        cameraPermission: cameraPermissions,
        microphonePermission: micPermissions,
      },
    ],
  ],
  expo: {
    jsEngine: 'hermes',
    extra: {
      API_URL_2: process.env.API_URL_2,
      eas: {
        projectId: 'c5454c89-c67f-4b0d-a046-8f93a8e82cea',
      },
      //! David Charles
      API_URL: process.env.API_URL,
    },
    name: 'relay',
    slug: 'relay',
    // owner: 'mtyk',
    //! David Charles
    owner: 'ip-four',
    version: packageJson.version,
    orientation: 'portrait',
    icon: './src/assets/images/icon.png',
    scheme: 'relay',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './src/assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      url: 'https://u.expo.dev/c5454c89-c67f-4b0d-a046-8f93a8e82cea',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      buildNumber: packageJsonVersion,
      entitlements: {
        'com.apple.developer.healthkit': true,
      },
      associatedDomains: ['applinks:app.relayapp.co.uk'],
      bundleIdentifier: 'uk.co.ipfour.relay',
      infoPlist: {
        NSHealthShareUsageDescription:
          'Allow Relay to read health data you choose to share with your practitioner.',

        NSHealthUpdateUsageDescription:
          'Relay does not update your health data, but does include libraries which possess this capability.',

        // Doesn't seem that the config plugin is working for these, so we have to add them manually
        NSMicrophoneUsageDescription: micPermissions,
        NSCameraUsageDescription: cameraPermissions,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './src/assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      versionCode: androidVersionCode,
      //! David Charles
      package: 'uk.co.ipfour.relay.android',
      intentFilters: [
        {
          action: 'VIEW',
          data: [
            {
              scheme: 'https',
              host: '*.relayapp.co.uk',
              pathPrefix: '/client-invite',
            },
          ],
          category: ['BROWSABLE', 'DEFAULT'],
        },
      ],
    },
    description: '',
  },
}
