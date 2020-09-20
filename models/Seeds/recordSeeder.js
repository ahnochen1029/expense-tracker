const record = require('../record')
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/expense-tracker", { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.once('open', () => {
  record.create(
    {
      name: '鐵板燒',
      category: '餐飲食品',
      date: '2020-08-01',
      amount: 350,
      icon: '<i class="fas fa-utensils"></i>'
    },
    {
      name: '高鐵票',
      category: '交通出行',
      date: '2020-08-10',
      amount: 700,
      icon: '<i class="fas fa-shuttle-van"></i>'
    },
    {
      name: '房租',
      category: '家居物業',
      date: '2020-08-20',
      amount: 15000,
      icon: '<i class="fas fa-home"></i>'
    },
    {
      name: '看棒球',
      category: '休閒娛樂',
      date: '2020-08-21',
      amount: 500,
      icon: '<i class="fas fa-grin-beam"></i>'
    },
    {
      name: '保單',
      category: '其他',
      date: '2020-08-26',
      amount: 2500,
      icon: '<i class="fas fa-pen"></i>'
    },
  )
  console.log('done!')
})