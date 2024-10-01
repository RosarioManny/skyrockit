const passUserToView = (req, res, next) => {
    res.locals.user = req.session.user ? req.session.user : null
    next()
}

// res.locals.user is effectively adding req.session.user to a locals object. 
// Note there is always a locals object, even if not stated. Its just undefined.
  
module.exports = passUserToView