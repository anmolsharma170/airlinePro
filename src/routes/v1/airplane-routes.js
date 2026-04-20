const express = require('express');
const {AirplaneController} = require('../../controllers');
const {AirplaneMiddlewares} = require('../../middlewares');
const router = express.Router();

//  /api/v1/airplanes and this is a POST request
router.post('/', 
        AirplaneMiddlewares.validateCreateRequest,
        AirplaneController.createAirplane)
module.exports = router;


//  /api/v1/airplanes and this is a GET request
router.get('/', 
        AirplaneController.getAirplanes
);

//  /api/v1/airplanes/:id and this is a POST request
router.get('/:id', 
        AirplaneController.getAirplane
);
module.exports = router;


