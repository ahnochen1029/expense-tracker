const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')


//filter
router.get('/filter', (req, res) => {
  const filterCategory = req.query.filter
  Record.find()
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
  const name = req.body.name
  console.log('name', name)
  const category = req.body.category
  const date = req.body.date
  const amount = req.body.amount
  const icon = req.body.icon

  let categoryArr = []
  categoryArr = categoryArr.concat(category.split(','))
  return Record.create({
    name: name,
    category: categoryArr[0],
    date: date,
    amount: amount,
    icon: categoryArr[1]
  })
    .then(() => { res.redirect('/') })
    .catch(err => console.log(err))
})

//edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
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
  const id = req.params.id
  let name = req.body.name
  let category = req.body.category
  let date = req.body.date
  let amount = req.body.amount
  let icon = req.body.icon
  let categoryArr = []
  categoryArr = categoryArr.concat(category.split(','))
  return Record.findById(id)
    .then(record => {
      record.name = name
      record.category = categoryArr[0]
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
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})
module.exports = router