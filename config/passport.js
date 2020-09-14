const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')
const bcrypt = require('bcryptjs')

// setting for passport
module.exports = function(passport) {
    passport.use(new LocalStrategy({usernameField: 'email',}, async (email, password, done) => {
        const user = await User.findOne({email})
        let checkPassword
        if(user){   // if user exist
            checkPassword = await bcrypt.compare(password, user.password)
        } else {
            return done(null, false)
        }
        if(checkPassword){ // if password == user.password (alredy hashed)
            return done(null, user)
        } else {
            return done(null, false)
        }
    }))

// when we log in it's call one time and "save" information for access
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
// when we alredy logged in and it's give us "access" to monitor in "private"
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            if(err) {
                done(err)
            } else {
                done(null, user)
            }
        });
    });
}