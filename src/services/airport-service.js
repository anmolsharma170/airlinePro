// services use repositories to intract with the database
const { StatusCodes } = require('http-status-codes');
const {AirportRepository} = require('../repositories');
const airportrepository = new AirportRepository();
const AppError = require('../utils/errors/app-error');
const { getAirplane } = require('./airplaneservice');
async function createAirport(data){
    try{
        const airport = await airportrepository.create(data);
        return airport;
    } catch(error){
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
        throw new AppError('Cannot create a new airport object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirports(data){
    try{
        const airports = await airportrepository.getAll();
        return airports;
    }catch(error){
                throw new AppError('Cannot fetch data of all the airports',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id){
    try {
        const airport = await airportrepository.get(id);
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The airport you requested is not present',error.statusCode);
        }
        throw new AppError('Cannot fetch data of all the airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirport(id){
    try {
        const response = await airportrepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The airport you requested to delete is not present',error.statusCode);
        }
        throw new AppError('Problem in deleting airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function updateAirport(id,data){
    try {
        const response = await airportrepository.update(id,data);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The airport you requested is not present',error.statusCode);
        }
        throw new AppError('Problem in updating airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createAirport,
    getAirport,
    getAirports,
    destroyAirport,
    updateAirport
}
// based on what response we got from crud repository we can configure app error directly here