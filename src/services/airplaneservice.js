// services use repositories to intract with the database
const { StatusCodes } = require('http-status-codes');
const {AirplaneRepository} = require('../repositories');
const airplanerepository = new AirplaneRepository();
const AppError = require('../utils/errors/app-error');
async function createAirplane(data){
    try{
        const airplane = await airplanerepository.create(data);
        return airplane;
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
        throw new AppError('Cannot create a new airplane object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplanes(data){
    try{
        const airplanes = await airplanerepository.getAll();
        return airplanes;
    }catch(error){
                throw new AppError('Cannot fetch data of all the airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplane(id){
    try {
        const airplanes = await airplanerepository.get(id);
        return airplanes;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you requested is not present',error.statusCode);
        }
        throw new AppError('Cannot fetch data of all the airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirplane(id){
    try {
        const response = await airplanerepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you requested to delete is not present',error.statusCode);
        }
        throw new AppError('Problem in deleting airplane', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function updateAirplane(id,data){
    try {
        const response = await airplanerepository.update(id,data);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you requested is not present',error.statusCode);
        }
        throw new AppError('Problem in updating airplane', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}
// based on what response we got from crud repository we can configure app error directly here