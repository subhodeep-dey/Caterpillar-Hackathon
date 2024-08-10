const express = require('express');
const index = require('../src/routes/index');
// const user = require('../src/routes/user');
// const notes = require('../src/routes/note.route.js');

const vehicleRoutes = require('../src/routes/vehicle.routes.js');
const inspectionRoutes = require('../src/routes/inspection.routes.js');
const tireInspectionRoutes = require('../src/routes/tireInspection.routes.js');
const batteryInspectionRoutes = require('../src/routes/batteryInspection.routes.js');
const exteriorInspectionRoutes = require('../src/routes/exteriorInspection.routes.js');
const brakeInspectionRoutes = require('../src/routes/brakeInspection.routes.js');
const engineInspectionRoutes = require('../src/routes/engineInspection.routes.js');
const voiceOfCustomerRoutes = require('../src/routes/voiceOfCustomer.routes.js');
const inspectionImagesRoutes = require('../src/routes/inspectionImages.routes.js');
const analyseSpeechRoutes = require('../src/routes/analyseSpeech.routes.js');


const setRoutes = (app) => {
  const router = express.Router();

  // Use the routes
  router.use('/', index);
  // router.use('/users', user);
  // router.use('/notes', notes);
  router.use('/vehicles', vehicleRoutes);
  router.use('/inspections', inspectionRoutes);
  router.use('/tire-inspections', tireInspectionRoutes);
  router.use('/battery-inspections', batteryInspectionRoutes);
  router.use('/exterior-inspections', exteriorInspectionRoutes);
  router.use('/brake-inspections', brakeInspectionRoutes);
  router.use('/engine-inspections', engineInspectionRoutes);
  router.use('/voice-of-customer', voiceOfCustomerRoutes);
  router.use('/inspection-images', inspectionImagesRoutes);
  router.use('/analyse-speech', analyseSpeechRoutes);

  app.use(router);
};

module.exports = { setRoutes };