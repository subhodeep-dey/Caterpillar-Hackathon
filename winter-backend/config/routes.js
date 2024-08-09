const express = require('express');
const index = require('../src/routes/index');
const user = require('../src/routes/user');

const setRoutes = (app) => {
  const router = express.Router();

  // Use the routes
  router.use('/', index);
  router.use('/users', user);

  app.use(router);
};

module.exports = { setRoutes };