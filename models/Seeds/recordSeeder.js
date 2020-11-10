const Record = require('../record')

const db = require('../../config/mongoose')

db.once('open', () => {
  Record.create(
    {
      name: '鐵板燒',
      category: '餐飲食品',
      merchant: '好吃鐵板燒',
      date: '2020-08-01',
      amount: 350,
      icon: 'fas fa-utensils'
    },
    {
      name: '高鐵票',
      category: '交通出行',
      merchant: '台灣高鐵',
      date: '2020-08-10',
      amount: 700,
      icon: 'fas fa-shuttle-van'
    },
    {
      name: '房租',
      category: '家居物業',
      merchant: '其他',
      date: '2020-08-20',
      amount: 15000,
      icon: 'fas fa-home'
    },
    {
      name: '看棒球',
      category: '休閒娛樂',
      merchant: 'CPBL',
      date: '2020-08-21',
      amount: 500,
      icon: 'fas fa-grin-beam'
    },
    {
      name: '保單',
      category: '其他',
      merchant: '富邦人壽',
      date: '2020-08-26',
      amount: 2500,
      icon: 'fas fa-pen'
    },
  )
  console.log('mongodb_record connected!')
})