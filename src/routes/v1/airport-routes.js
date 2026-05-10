const express = require('express');
const {AirportController} = require('../../controllers');
const {AirportMiddlewares} = require('../../middlewares');
const router = express.Router();

//  /api/v1/airplanes and this is a POST request
router.post('/', 
        AirportMiddlewares.validateCreateRequest,
        AirportController.createAirport)

//  /api/v1/airplanes and this is a GET request
router.get('/', 
        AirportController.getAirports
);

//  /api/v1/airplanes/:id and this is a POST request
router.get('/:id', 
        AirportController.getAirport
);
router.delete('/:id', 
        AirportController.destroyAirport
);
router.patch('/:id', 
        AirportController.updateAirport
);
module.exports = router;


