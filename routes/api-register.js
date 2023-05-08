const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

router.get('/', function(req, res) {
  res.render('register');
});

router.post('/', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, 10, function(err, hashedPassword) {
    if (err) {
      console.log(err);
      res.send('Có lỗi xảy ra khi đăng ký!');
    } else {
      const newUser = new User({
        username: username,
        password: hashedPassword
      });

      newUser.save(function(err) {
        if (err) {
          console.log(err);
          res.send('Có lỗi xảy ra khi đăng ký!');
        } else {
          res.send('Đăng ký thành công!');
        }
      });
    }
  });
});

module.exports = router;
