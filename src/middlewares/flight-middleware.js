const {StatusCodes} = require('http-status-codes');
const {ErrorResponse} = require('../utils/common');
const AppError = require('../utils/errors/app-error');
function validateCreateRequest(req,res,next){
    if(!req.body.airplaneId){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError([`AirplaneId not found in the incoming request in the correct form`],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.flightNumber){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError([`Flight Number not found in the incoming request in the correct form`],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.departure_airport_Id){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError([`departure_airport_Id not found in the incoming request in the correct form`],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.arrival_airport_Id){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError([`arrival_airport_Id not found in the incoming request in the correct form`],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.departure_time){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError([`departure_time not found in the incoming request in the correct form`],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.arrival_time){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError([`arrival_time not found in the incoming request in the correct form`],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.price){
        ErrorResponse.message = 'Something went wrong while creating flight'; 
        ErrorResponse.error = new AppError([`price not found in the incoming request in the correct form`],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.total_seats){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = new AppError([`total_seats not found in the incoming request in the correct form`],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.airline_name){
        ErrorResponse.message = 'Something went wrong while creating flight'; 
        ErrorResponse.error = new AppError([`airline_name not found in the incoming request in the correct form`],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}
module.exports = {
    validateCreateRequest
} 