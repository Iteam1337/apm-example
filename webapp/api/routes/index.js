const { Router } = require('express')
const router = Router()

router.get('/', (req, res, next) => {
  res.send('ok')
})
router.get('/bork', (req, res, next) => {
  next(new Error('b0rk'))
})

module.exports = router
