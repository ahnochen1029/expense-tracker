const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const hbshelpers = require('handlebars-helpers')
const usePassport = require('./config/passport')

const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')
require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main', helpers: hbshelpers() }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: 'Youwillneverknow',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)

app.use(express.static('public'))
app.use(routes)


app.listen(port, () => {
  console.log(`The app is runnung on http://localhost:${port}`)
})
