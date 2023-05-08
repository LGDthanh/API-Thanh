const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

router.get('/', function(req, res) {
  res.render('login');
});

router.post('/', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username }, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        // Mã hóa mật khẩu và so sánh với mật khẩu trong cơ sở dữ liệu
        bcrypt.compare(password, foundUser.password, function(err, result) {
          if (result === true) {
            req.session.user = foundUser;
            res.redirect('/dashboard');
          } else {
            res.send('Sai mật khẩu!');
          }
        });
      } else {
        res.send('Không tìm thấy người dùng!');
      }
    }
  });
});

module.exports = router;
