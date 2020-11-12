const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

//filter
router.get('/filter', (req, res) => {
  const filterCategory = req.query.filter
  const userId = req.user._id
  Record.find({ userId })
    .lean()
    .then(records => {
      let filterRecord = records.filter(item => {
        return item.category === filterCategory
      })
      let filterAmount = 0
      filterRecord.forEach(item => {
        filterAmount += Number(item.amount)
      })

      return res.render('index', {
        records: filterRecord,
        totalAmount: filterAmount.toLocaleString('zh-TW'),
        filterCategory,
      })
    })
    .catch(err => console.log(err))
})

//new
router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(category => res.render('new', { category }))
})

router.post('/', (req, res) => {
  const { name, category, merchant, date, amount, icon } = req.body
  const userId = req.user._id
  let categoryArr = []
  categoryArr = categoryArr.concat(category.split(','))
  return Record.create({
    name,
    category: categoryArr[0],
    merchant,
    date,
    amount,
    icon: categoryArr[1],
    userId
  })
    .then(() => { res.redirect('/') })
    .catch(err => console.log(err))
})

//edit
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Record.findOne({ _id, userId })
    .lean()
    .then((record) => {
      Category.find()
        .lean()
        .then(category => {
          const newCategories = category.filter(item => item.category !== record.category)
          const selectedCategory = category.filter(item => item.category === record.category)
          res.render('edit', { record, category: newCategories, selectedCategory })
        })
    })
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  let { name, category, merchant, date, amount, icon } = req.body
  let categoryArr = []
  categoryArr = categoryArr.concat(category.split(','))
  return Record.findOne({ _id, userId })
    .then(record => {
      record.name = name
      record.category = categoryArr[0]
      record.merchant = merchant
      record.date = date
      record.amount = amount
      record.icon = categoryArr[1]
      return record.save()
    })
    .then(() => {
      return res.redirect('/')
    })
    .catch(err => console.loge(err))
})

//delete
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})
module.exports = router