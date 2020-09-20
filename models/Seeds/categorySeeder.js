const category = require('../category')

const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/expense-tracker", { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.once('open', () => {
  category.create(
    {
      category: '家居物業',
      icon: 'fas fa-home'
    },
    {
      category: '交通出行',
      icon: 'fas fa-shuttle-van'
    },
    {
      category: '休閒娛樂',
      icon: 'fas fa-grin-beam'
    },
    {
      category: '餐飲食品',
      icon: 'fas fa-utensils'
    },
    {
      category: '其他',
      icon: 'fas fa-pen'
    }
  )
  console.log('mongodb connected!')
})
