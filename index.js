
var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var keys = require('./server/config/key.js');
var passport = require('passport');
var cookieSession = require('cookie-session')
const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI);

require('./server/services/passport');

app.use(cookieSession({
    maxAge:30*24*60*60*1000,
    keys: ['key1', 'key2']
}));

app.use(passport.initialize());
app.use(passport.session());

var authPath = require('./server/routes/auth');
authPath(app);


app.listen(port, function(){
      console.log('------------'+port);
});