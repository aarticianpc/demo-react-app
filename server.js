const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

// Getting authentication routes
const auth = require('./routes/api/auth');
// Getting user routes
const users = require('./routes/api/users');

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/key').mongoURI;

// Connect to mongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

app.use('/api/auth', auth);
app.use('/api/user', users);

if(process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client_v2/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client_v2', 'build', 'index.html'));
  });

}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));