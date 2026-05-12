// services use repositories to intract with the database
const { StatusCodes } = require('http-status-codes');
const {FlightRepository} = require('../repositories');

const AppError = require('../utils/errors/app-error');
const flightRepository = new FlightRepository();
const comapareTime = require('../utils/helpers/datetime-helpers');
async function createFlight(data){
    try{
        const flight = await flightRepository.create(data);
        if(!comapareTime(flight.arrivalTime, flight.departureTime)){
            throw new AppError('Arrival time cannot be less than departure time', StatusCodes.BAD_REQUEST); //doing this in middleware can be a better option as we can avoid unnecessary database calls if the data is not valid
        }
        return flight;
    } catch(error){
        console.log(error); // Log the actual error to understand why DB creation fails
        // instead of loging errors everytime we will be using stacktrace 
        if(error.name=='SequelizeValidationError'){
            // console.log(error);
            let explanantion = [];
            error.errors.forEach((err)=>{
                explanantion.push(err.message);
            });
            // console.log(explanantion);
            throw new AppError(explanantion,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new flight object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight
}
// based on what response we got from crud repository we can configure app error directly here