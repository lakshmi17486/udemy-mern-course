const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys')
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);
const app = express();
app.use(express.json());

//use cookie instead of JWT for authentication here
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)

app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'production') {
  // Express will serve production assets like main.js ,main.css
  app.use(express.static('client/build'));


  //Express will serve index.html when route not recognized like /surveys => react router is responsible
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')); //express return index.html
  });
}

const PORT = process.env.PORT || 5000;

//require('.../authRoutes') returns a function , which will be called with paramter app
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);


app.listen(PORT,()=>{
    console.log('Server starts running!')
})

