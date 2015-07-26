module.exports = function (app) {
  var controller = app.controllers.contact;
  var Auth = app.auth.auth;

  app.get('/api/v1/contacts', Auth.isAuthenticated, controller.index);
  app.get('/api/v1/contacts/:_id', Auth.isAuthenticated, controller.profile);
}
