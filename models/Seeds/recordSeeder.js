const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')

const Record = require('../record')
const User = require('../user')

const SEED_USER = {
  name: 'user',
  email: 'user@example.com',
  password: '0000'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash =>
      User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash
      })
    )
    .then(user => {
      const userId = user._id
      return Promise.all(Array.from(
        { length: 1 },
        (_, i) => Record.create(
          {
            name: '鐵板燒',
            category: '餐飲食品',
            merchant: '好吃鐵板燒',
            date: new Date(2020, 8, 1),
            amount: 350,
            icon: 'fas fa-utensils',
            userId
          },
          {
            name: '高鐵票',
            category: '交通出行',
            merchant: '台灣高鐵',
            date: new Date(2020, 8, 10),
            amount: 700,
            icon: 'fas fa-shuttle-van',
            userId
          },
          {
            name: '房租',
            category: '家居物業',
            merchant: '其他',
            date: new Date(2020, 8, 20),
            amount: 15000,
            icon: 'fas fa-home',
            userId
          },
          {
            name: '看棒球',
            category: '休閒娛樂',
            merchant: 'CPBL',
            date: new Date(2020, 8, 25),
            amount: 500,
            icon: 'fas fa-grin-beam',
            userId
          },
          {
            name: '保單',
            category: '其他',
            merchant: '富邦人壽',
            date: new Date(2020, 9, 1),
            amount: 2500,
            icon: 'fas fa-pen',
            userId
          },
        )
      ))
    })
    .then(() => {
      console.log('done recordseeder.')
      process.exit()
    })
})