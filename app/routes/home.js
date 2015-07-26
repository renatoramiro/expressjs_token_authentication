module.exports = function (app) {
	var controller = app.controllers.home;
	var Auth = app.auth.auth;

  app.get('/api/v1', controller.index);
  app.get('/api/v1/about', controller.about);

  app.post('/api/v1/login', controller.login);
  app.post('/api/v1/register', controller.register);
  // app.post('/api/v1/logout', Auth.isAuthenticated, controller.logout);
}
