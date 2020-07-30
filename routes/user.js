const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', async (req, res) => {
    const { username, email, password, password2 } = req.body
    const checkUser = await User.findOne({email})
    console.log(checkUser)
})

module.exports = router