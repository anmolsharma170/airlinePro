const express = require('express');
const {CityController} = require('../../controllers');
const router = express.Router();
const {CityMiddlewares} = require('../../middlewares');

router.post('/',
    CityMiddlewares.validateCreateRequest,
    CityController.createCity
)
module.exports= router;