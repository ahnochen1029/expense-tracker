const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const hbshelpers = require('handlebars-helpers')

const Record = require('./models/record')
const Category = require('./models/category')




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
const routes = require('./routes')


app.engine('handlebars', exphbs({ defaultLayout: 'main', helpers: hbshelpers() }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(routes)


app.listen(port, () => {
  console.log(`The app is runnung on http://localhost:${port}`)
})
