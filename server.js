const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const bcrypt = require('bcryptjs');
const loginRouter = require('./routes/api-login');
const registerRouter = require('./routes/api-register');
const postmovieRouter = require('./routes/post-movie');
const getmovieRouter = require('./routes/get-movie');
const getidmovieRouter = require('./routes/idmovie');

//const putmovieRouter = require('./routes/');
const deletemovieRouter = require('./routes/delete-movie');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/thanh', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "ourlittlesecret", // Khóa bí mật cho phiên
    resave: false, // Không lưu lại phiên nếu không có sự thay đổi
    saveUninitialized: false // Không lưu lại phiên nếu không có dữ liệu
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

app.use('/api/movies/post', postmovieRouter);
app.use('/movies', getmovieRouter);

app.use('/api/movies/delete', deletemovieRouter);

// Định nghĩa middleware để sử dụng EJS làm view engine

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public/'));

app.listen(3000, function() {
  console.log('Server đã khởi động thành công!');
});
