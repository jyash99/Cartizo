const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5ec37255213a49495cc7cc04')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://yash_jain:yashjain@cluster1-brj2c.mongodb.net/shop?retryWrites=true&w=majority')
.then(result => {
  User.findOne().then(user => {
    if(!user) {
      const user = new User({
        name: 'Yash',
        email: 'yash.jain1999@gmail.com',
        cart: {
          items: []
        }
      });
      user.save();
    }
  })
  app.listen(3000);
})
.catch(err => {
  console.log(err);
})