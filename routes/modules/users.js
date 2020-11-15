const express = require('express')
const router = express.Router()

const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
})
)

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: '這個 Email 已經註冊過了。' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(() => {
        req.flash('success_msg', '註冊成功，請登入。')
        res.redirect('/users/login')
      })
      .catch(err => console.log(err))
  })
})


// router.post('/register', (req, res, next) => {
//   const { name, email, password, confirmPassword } = req.body
//   const errors = []

//   // handle errors situation
//   if (!name || !email || !password || !confirmPassword) {
//     errors.push({ message: 'All fields are required.' })
//   }
//   if (password.length < 8) {
//     errors.push({ message: 'Password at least 8 characters minimum.' })
//   }
//   if (password !== confirmPassword) {
//     errors.push({ message: 'Your password and confirmation password do not match.' })
//   }
//   if (errors.length) {
//     return res.render('register', { errors, name, email, password, confirmPassword })
//   }

//   User.findOne({ email }).then(user => {
//     if (user) {
//       errors.push({ message: 'This email address is already registered.' })
//       return res.render('register', { errors, name, email, password, confirmPassword })
//     }
//     return bcrypt.genSalt(10)
//       .then(salt => bcrypt.hash(password, salt))
//       .then(hash => User.create({ name, email, password: hash }))
//       .then(() => next())
//       .catch(err => console.log(err))
//   })
// }, passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/users/login',
//   successFlash: true,
//   failureFlash: true
// }))

// router.get('/logout', (req, res) => {
//   req.logout()
//   req.flash('success_msg', '你已經成功登出。')
//   res.redirect('/users/login')
// })


module.exports = router