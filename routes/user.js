const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const { isNotAuthenticatedMiddleware, alreadyAuthenticatedMiddleware } = require('../config/auth')

router.get('/login', alreadyAuthenticatedMiddleware, (req, res) => {
    res.render('login')
})

router.get('/register', alreadyAuthenticatedMiddleware, (req, res) => {
    res.render('register')
})

router.post('/register', alreadyAuthenticatedMiddleware, async (req, res) => {
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

router.post('/login', alreadyAuthenticatedMiddleware, (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    })(req, res, next)
})

router.get('/logout', isNotAuthenticatedMiddleware, (req, res) => {
    req.logout();
    res.redirect('/login');
});


router.get('/', isNotAuthenticatedMiddleware, (req, res) => {
    res.send(`<h1>Hello man</h1><br><a href="/logout">Log out</a>`)
})


module.exports = router