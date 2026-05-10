const {StatusCodes} = require('http-status-codes');
const {ErrorResponse} = require('../utils/common');
const AppError = require('../utils/errors/app-error');
function validateCreateRequest(req,res,next){
    if(!req.body.name){
        ErrorResponse.message = 'Something went wrong while creating airport'; //putting these kind of raw strings is not a good practice but for our porsenal small project we are using it we can handle it in a json file later for more clarity
        // one more reason is translation we sometimes directly send these messages from json using some translation mechanism and techniques so that client could understand in his/her languade about the error
        // ErrorResponse.error = `Model Number not found in the incoming request in the correct form`
        ErrorResponse.error = new AppError([`Model Name not found in the incoming request in the correct form`],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.code){
        ErrorResponse.message = 'Something went wrong while creating airport'; //putting these kind of raw strings is not a good practice but for our porsenal small project we are using it we can handle it in a json file later for more clarity
        // one more reason is translation we sometimes directly send these messages from json using some translation mechanism and techniques so that client could understand in his/her languade about the error
        // ErrorResponse.error = `Model Number not found in the incoming request in the correct form`
        ErrorResponse.error = new AppError([`Airport Code not found in the incoming request in the correct form`],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.cityId){
        ErrorResponse.message = 'Something went wrong while creating airport'; //putting these kind of raw strings is not a good practice but for our porsenal small project we are using it we can handle it in a json file later for more clarity
        // one more reason is translation we sometimes directly send these messages from json using some translation mechanism and techniques so that client could understand in his/her languade about the error
        // ErrorResponse.error = `Model Number not found in the incoming request in the correct form`
        ErrorResponse.error = new AppError([`Airport cityId not found in the incoming request in the correct form`],StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}
module.exports = {
    validateCreateRequest
} 