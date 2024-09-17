module.exports = {
  name: 'relay-shared',
  packageJSON: j => {
    delete j.repository
  },
  tsConfig: p => {
    p.compilerOptions.jsx = 'react'
  },
  packageManager: 'yarn',
  deployments: [
    {
      name: 'Relay Dash EC2',
      app: 'relay-practitioner-app',
      host: 'relay-ec2',
      username: 'ubuntu',
    },
    {
      name: 'Relay API EC2',
      app: 'relay-api',
      host: 'relay-ec2',
      username: 'ubuntu',
      stack: [{ tech: 'mongodb' }],
    },
  ],
}
