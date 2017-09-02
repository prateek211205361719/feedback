

var passport = require("passport");

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
    app.get('/auth/google/callback',  passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
        res.send('hello how are u');
    });
};

  
