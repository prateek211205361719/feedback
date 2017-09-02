

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

var keys = require('../config/key.js');
var { User } = require('../models/user.js');

passport.serializeUser(function(user, done){
   done(null, user.id)
});

passport.deserializeUser(function(id, done){
     User.findById(id).then((user) => {
        done(null, user)
     });
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientId,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
     
      User.findOne({ googleId: profile.id }).then((user) => {
           if(user){
                done(null , user);
           }else{
               var newUser = new User({googleId: profile.id});
               newUser.save().then((newuser) => {
                    done(null , newuser);
               });
           }
      });
  }
));