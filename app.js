const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const hbshelpers = require('handlebars-helpers')

const Record = require('./models/record')
const Category = require('./models/category')
const category = require('./models/category')
const record = require('./models/record')

mongoose.connect("mongodb://localhost/expense-tracker", { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main', helpers: hbshelpers() }))
app.set('view engine', 'handlebars')


app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(express.static('public'))


app.get('/', (req, res) => {
  Record.find()
    .lean()
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

//new
app.get('/expensetracker/new', (req, res) => {
  Category.find()
    .lean()
    .then(category => res.render('new', { category }))
})

app.post('/expensetracker', (req, res) => {
  const name = req.body.name
  const category = req.body.category
  const date = req.body.date
  const amount = req.body.amount
  const icon = req.body.icon

  let categoryArr = []
  categoryArr = categoryArr.concat(category.split(','))
  console.log("categoryArr", categoryArr)

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
app.get('/expensetracker/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => {
      Category.find()
        .lean()
        .then(category => {
          const newCategories = category.filter(element => element.name !== record.category)
          res.render('edit', { record, category: newCategories })
        })
    })
    .catch(err => console.log(err))
})

app.put('/expensetracker/:id', (req, res) => {
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
      record.category = category
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
app.delete('/expensetracker/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//sort
// app.get('/sort', (req, res) => {
//   const sort = req.query.sort
//   console.log('sort', sort)

// })

app.listen(port, () => {
  console.log(`The app is runnung on http://localhost:${port}`)
})
