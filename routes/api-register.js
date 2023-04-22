const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', function(req, res) {
  res.render('register');
});

router.post('/', function(req, res) {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password
  });

  newUser.save(function(err) {
    if (err) {
      console.log(err);
      res.send('Có lỗi xảy ra khi đăng ký!');
    } else {
      res.send('Đăng ký thành công!');
    }
  });
});

module.exports = router;
