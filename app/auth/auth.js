var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

module.exports = function (app) {
  var auth = {};

  auth.isAuthenticated = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, app.get( 'secret_string'), function (err, decoded) {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          req.decoded = decoded;
          next();
        }
      })
    } else {
      return res.json({ success: false, message: 'No token provided.' });
    }
  };

  return auth;
}
