const express = require('express');
const {CityController} = require('../../controllers');
const router = express.Router();
const {CityMiddlewares} = require('../../middlewares');

router.post('/',
    CityMiddlewares.validateCreateRequest,
    CityController.createCity
)

router.delete('/:id',
    CityController.deleteCity
)
router.patch('/:id',
    CityController.updateCity
)
module.exports= router;