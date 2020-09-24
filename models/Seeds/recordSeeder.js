const Record = require('../record')

const db = require('../../config/mongoose')


db.once('open', () => {
  Record.create(
    {
      name: '鐵板燒',
      category: '餐飲食品',
      date: '2020-08-01',
      amount: 350,
      icon: 'fas fa-utensils'
    },
    {
      name: '高鐵票',
      category: '交通出行',
      date: '2020-08-10',
      amount: 700,
      icon: 'fas fa-shuttle-van'
    },
    {
      name: '房租',
      category: '家居物業',
      date: '2020-08-20',
      amount: 15000,
      icon: 'fas fa-home'
    },
    {
      name: '看棒球',
      category: '休閒娛樂',
      date: '2020-08-21',
      amount: 500,
      icon: 'fas fa-grin-beam'
    },
    {
      name: '保單',
      category: '其他',
      date: '2020-08-26',
      amount: 2500,
      icon: 'fas fa-pen'
    },
  )
  console.log('done!')
})