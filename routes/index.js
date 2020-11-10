const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const expense = require('./modules/expense')
const users = require('./modules/users')

router.use('/users', users)
router.use('/expensetracker', expense)
router.use('/', home)


module.exports = router