if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Category = require('../category')

const db = require('../../config/mongoose')

db.once('open', () => {
  Category.create(
    [{
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
    }]
  )
    .then(() => {
      db.close()
      console.log('created category!')
    })
    .catch(err => console.log(err))
  console.log('mongodb_category connected!')
})
