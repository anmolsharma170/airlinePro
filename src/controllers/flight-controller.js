const {StatusCodes} = require('http-status-codes');
const {FlightService} = require('../services');
const { error } = require('winston');
const {SuccessResponse, ErrorResponse} = require('../utils/common');
const airport = require('../models/airport');
// create airport api will look like
// it will be a post request 
// data will come inside request body 
async function createFlight(req,res){
    try{
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departure_airport_Id: req.body.departure_airport_Id,
            arrival_airport_Id: req.body.arrival_airport_Id,
            departure_time:req.body.departure_time,
            arrival_time:req.body.arrival_time,
            price:req.body.price,
            total_seats:req.body.total_seats,
            boardingGate:req.body.boardingGate,
            airline_name:req.body.airline_name
        });
        SuccessResponse.data = flight;
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

async function getAllFlights(req,res){
    try {
        console.log(req.query);
        const flights = await FlightService.getAllFlights(req.query);
        SuccessResponse.data = flights;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
        .status(error.statusCode)
        .json(ErrorResponse);
    }
}

module.exports = {
    createFlight,
    getAllFlights
}



// In the try block we have the controller we just called the service
// nothing more nothing less
// we got the request we passed it to the service
// service is going to do all the computations and db intraction
// it will give me back my airport and what controller does extra is structuring the output as we can see in  json we are doing
// and to trigger this controller we have to register it in routes