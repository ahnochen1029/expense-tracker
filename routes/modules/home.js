const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
// const Category = require('../../models/category')

router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .lean()
    .sort({ date: 'asc' })
    .then(records => {
      let totalAmount = Number()
      records.forEach(item => {
        totalAmount += Number(item.amount)
      })
      return res.render('index', {
        records,
        totalAmount: totalAmount.toLocaleString('zh-tw')
      })
    })
    .catch(err => console.log(err))
})

module.exports = router