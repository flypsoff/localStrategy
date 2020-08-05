const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', async (req, res) => {
    const { username, email, password, password2 } = req.body
    const errors = []
    const checkUser = await User.findOne({email})
    
    if(!username || !email || !password || !password2) {
        errors.push({ msg: 'Enter all field' })
    }

    if(checkUser) {
        errors.push({ msg : 'Email already used' })
    }

    if(password !== password2) {
        errors.push({ msg: 'Password must be the same' })
    }
    if(errors.length > 0) {
        res.render('register', {
            errors
        })
    } else {
        const newUser = new User({
            username,
            email,
            password
        })

        try{
            const hash = await bcrypt.hash(newUser.password, 10)
            newUser.password = hash
            newUser.save().then(() => res.redirect('login'))
        } catch(e){
            console.log(e)
        }
    }
})

router.post('login', (req, res) => {
    
})

module.exports = router