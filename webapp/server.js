require('./apm').init()
const next = require('next')
const api = require('./api/app')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, quiet: false })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  api.get('*', (req, res) => {
    handle(req, res)
  })
  api.listen(process.env.PORT || 3000)
})