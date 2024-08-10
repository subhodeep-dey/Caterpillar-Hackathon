const express = require('express');
const index = require('../src/routes/index');
const user = require('../src/routes/user');
const notes = require('../src/routes/note.route.js');

const setRoutes = (app) => {
  const router = express.Router();

  // Use the routes
  router.use('/', index);
  router.use('/users', user);
  router.use('/notes', notes);

  app.use(router);
};

module.exports = { setRoutes };