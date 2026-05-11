const express = require('express');
const {FlightController} = require('../../controllers');
const {FlightMiddlewares} = require('../../middlewares');
const router = express.Router();

//  /api/v1/airplanes and this is a POST request
router.post('/', 
        FlightMiddlewares.validateCreateRequest,
        FlightController.createFlight)

module.exports = router;


