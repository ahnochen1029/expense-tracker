const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

const Record = require('./models/record')
const Category = require('./models/category')
const category = require('./models/category')

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

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render('index', { records }))
    .catch(err => console.log(err))
})

app.get('/new', (req, res) => {
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


app.listen(port, () => {
  console.log(`The app is runnung on http://localhost:${port}`)
})
