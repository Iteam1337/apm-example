let client, config

function init() {
  if (!client) {
    if (process.browser) {
      config = {
        // Overwrite service name from package.json
        // Allowed characters: a-z, A-Z, 0-9, -, _, and space
        serviceName: process.env.APP_NAME_FRONT || 'Such amaze frontend',

        // Use if APM Server requires a token
        secretToken: '',

        // Set custom APM Server URL (default: http://localhost:8200)
        serverUrl: process.env.APM_SERVER || 'http://localhost:8200',
      }
      console.log(`creating APM RUM client with config:\n${JSON.stringify(config, null, 2)}`)
      client = require('elastic-apm-js-base').init(config)
      client.setInitialPageLoadName(window.location.href)
    } else {
      config = {
        // Overwrite service name from package.json
        // Allowed characters: a-z, A-Z, 0-9, -, _, and space
        serviceName: process.env.APP_NAME_BACK || 'Such amaze backend',

        // Use if APM Server requires a token
        secretToken: '',

        // Set custom APM Server URL (default: http://localhost:8200)
        serverUrl: process.env.APM_SERVER_INTERNAL || 'http://localhost:8200',
      }
      console.log(`creating APM node.js client with config:\n${JSON.stringify(config, null, 2)}`)
      try {
        client = require('elastic-apm-node').start(config)
        if (!client) {
          throw new Error('APM client was not created')
        }
      } catch (err) {
        console.error(err)
      }
    }
  } else {
    console.log('client exists')
  }
  return client
}

module.exports = { init }
