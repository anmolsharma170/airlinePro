const {StatusCodes} = require('http-status-codes');
const {AirportService} = require('../services');
const { error } = require('winston');
const {SuccessResponse, ErrorResponse} = require('../utils/common');
const airport = require('../models/airport');
// create airport api will look like
// it will be a post request 
// data will come inside request body 
async function createAirport(req,res){
    try{
        const airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId
        });
        SuccessResponse.data = airport;
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

async function getAirports(req,res){
    try{
        const airports = await AirportService.getAirports();
        SuccessResponse.data = airports;
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

async function getAirport(req,res){
    try {
        const airport = await AirportService.getAirport(req.params.id);
        SuccessResponse.data = airport;
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

async function destroyAirport(req,res){
    try {
        const airport = await AirportService.destroyAirport(req.params.id);
        SuccessResponse.data = airport;
        return res
        .status(StatusCodes.OK)
        .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res
        .status(error.statusCode)
        .json(ErrorResponse);
    }
}
async function updateAirport(req,res){
    try {
        const airport = await AirportService.updateAirport(req.params.id, req.body);
        SuccessResponse.data = airport;
        return res
        .status(StatusCodes.OK)
        .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res
        .status(error.statusCode)
        .json(ErrorResponse);
    }
}

module.exports = {
    createAirport,
    getAirport,
    getAirports,
    destroyAirport,
    updateAirport
}



// In the try block we have the controller we just called the service
// nothing more nothing less
// we got the request we passed it to the service
// service is going to do all the computations and db intraction
// it will give me back my airport and what controller does extra is structuring the output as we can see in  json we are doing
// and to trigger this controller we have to register it in routes