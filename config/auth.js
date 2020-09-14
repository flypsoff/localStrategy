module.exports = {
    isNotAuthenticatedMiddleware: (req, res, next) => { // can't browse without auth
        if(req.isAuthenticated()){
            return next()
        }
        res.redirect('/login')
    },
    alreadyAuthenticatedMiddleware: (req, res, next) => { // if already auth we can't go to login and register!
        if(!req.isAuthenticated()){
            return next()
        }
        res.redirect('/')
    }
}