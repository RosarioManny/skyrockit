const isSignedIn = (req, res, next) => {
    if (req.session.user) return next(); // if req.session.user is true, Someone one is signed in, continue to next
        res.redirect('/auth/sign-in');
}
// next() is leading to the next function and not chain of commands within the function.

module.exports = isSignedIn;