const {StatusCodes} = require('http-status-codes');
const {AirplaneService} = require('../services');
const { error } = require('winston');
const {SuccessResponse, ErrorResponse} = require('../utils/common');
// create airplane api will look like
// it will be a post request 
// data will come inside request body 
// req-body {modelNumber: 'airbus320', capacity: 200}
async function createAirplane(req,res){
    try{
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        SuccessResponse.data = airplane;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    }
    catch(error){
        ErrorResponse.error = error;
        return res
        .status(error.statusCode)
        .json(ErrorResponse);
    }
}

async function getAirplanes(req,res){
    try{
        const airplanes = await AirplaneService.getAirplanes();
        SuccessResponse.data = airplanes;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    }catch(error){
        ErrorResponse.error = error;
        return res
        .status(error.statusCode)
        .json(ErrorResponse);
    }
}

async function getAirplane(req,res){
    try {
        const airplane = await AirplaneService.getAirplane(req.params.id);
        SuccessResponse.data = airplane;
        return res.
            status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
        .status(error.statusCode)
        .json(ErrorResponse);
    }
}
module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane
}

// In the try block we have the controller we just called the service
// nothing more nothing less
// we got the request we passed it to the service
// service is going to do all the computations and db intraction
// it will give me back my airplane and what controller does extra is structuring the output as we can see in  json we are doing
// and to trigger this controller we have to register it in routes