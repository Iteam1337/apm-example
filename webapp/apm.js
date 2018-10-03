function init() {
  let client
  if (process.browser) {
    client = require('elastic-apm-js-base').init({
      // Overwrite service name from package.json
      // Allowed characters: a-z, A-Z, 0-9, -, _, and space
      serviceName: process.env.APP_NAME_FRONT || 'Such amaze frontend',

      // Use if APM Server requires a token
      secretToken: '',

      // Set custom APM Server URL (default: http://localhost:8200)
      serverUrl: process.env.APM_SERVER || 'http://localhost:8200',
    })
    client.setInitialPageLoadName(window.location.href)
  } else {
    client = require('elastic-apm-node').start({
      // Overwrite service name from package.json
      // Allowed characters: a-z, A-Z, 0-9, -, _, and space
      serviceName: process.env.APP_NAME_BACK || 'Such amaze backend',

      // Use if APM Server requires a token
      secretToken: '',

      // Set custom APM Server URL (default: http://localhost:8200)
      serverUrl: process.env.APM_SERVER || 'http://localhost:8200',
    })
  }
  return client
}

module.exports = { init }
