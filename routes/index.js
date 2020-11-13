const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const expense = require('./modules/expense')
const users = require('./modules/users')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth')

router.use('/users', users)
router.use('/expensetracker', authenticator, expense)
router.use('/auth', auth)
router.use('/', authenticator, home)


module.exports = router