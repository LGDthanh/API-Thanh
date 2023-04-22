const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const loginRouter = require('./routes/api-login');
const registerRouter = require('./routes/api-register');
const movieRouter = require('./routes/post-movie');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/thanh', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// const movieDB = mongoose.createConnection('mongodb://127.0.0.1:27017/thanh/movieDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'ourlittlesecret',
    resave: false,
    saveUninitialized: false
  })
);
// Định nghĩa route cho trang đăng xuất
app.get("/logout", function(req, res) {
  req.session.destroy();
  res.redirect("/login");
});
// Định nghĩa route cho trang dashboard
app.get("/dashboard", function(req, res) {
  if (req.session.user) {
      res.render("dashboard", { username: req.session.user.username });
    } else {
      res.redirect("/login");
    }
  });

app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.use('/movies', movieRouter);


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public/'));

app.listen(3000, function() {
  console.log('Ứng dụng đã khởi động thành công!');
});
