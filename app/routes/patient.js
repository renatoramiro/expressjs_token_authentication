module.exports = function (app) {
  var controller = app.controllers.patient;
  var Auth = app.auth.auth;

  app.get('/api/v1/patients/:username', Auth.isAuthenticated, controller.index);
  app.get('/api/v1/patients/:username/:_id', Auth.isAuthenticated, controller.detail);
  app.post('/api/v1/patients/:username', Auth.isAuthenticated, controller.create);
  app.delete('/api/v1/patients/:username', Auth.isAuthenticated, controller.remove);
}
