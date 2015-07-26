var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

module.exports = function (app) {
  var User = app.models.user;
  var controller = {};

  controller.index = function (req, res) {
    res.status(200).json({message: 'Welcome to Basic Token Authentication'});
  };

  controller.about = function (req, res) {
    res.status(200).json({message: 'About'});
  };

  controller.login = function (req, res) {
    User.findOne({username: req.body.username}, function (err, user) {
      if (err) return res.status(400).json(err);

      if (!user) {
        return res.json({success: false, message: 'Authentication failed. User not found.'});
      } else if (user) {
        if (!user.validPassword(req.body.password)) {
          return res.json({success: false, message: 'Authentication failed. Wrong password.'});
        } else {
          var token = jwt.sign(user, app.get('secret_string'));
          user.password = undefined;
          return res.json({
            success: true,
            message: 'Logged!',
            token: token,
            currentUser: user
          });
        }
      }
    });
  };

  controller.register = function (req, res) {
    var paramUser = {
      name: req.body.name || '',
      email: req.body.email || '',
  		username: req.body.username || '',
  		password: req.body.password || '',
    }

    if (paramUser.name === '' || paramUser.email === '' || paramUser.username === '' || paramUser.password === '') {
      return res.json({success: false, message: 'You need fill all fields'});
    }

    User.findOne({$or: [{username: paramUser.username}, {email: paramUser.email}]}, function (err, user) {
      if (err) return res.json(err);
      if (user) return res.json({success: false, message: 'Already exist a user with this email or username'});

      var newUser = new User(paramUser);
      newUser.save(function (err) {
        if (err) return res.json(err);
        newUser.password = undefined;
        return res.json(newUser);
      });
    });
  };

  return controller;
}
