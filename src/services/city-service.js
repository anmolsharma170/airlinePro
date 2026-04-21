const { StatusCodes } = require('http-status-codes');
const {CityRepository} = require('../repositories');
const cityRepository = new CityRepository();
const AppError = require('../utils/errors/app-error');

async function createCity(data){
    try{
        const city = await cityRepository.create(data);
        return city;
    } catch(error){
        // instead of loging errors everytime we will be using stacktrace 
        if(error.name=='SequelizeValidationError' || error.name=='SequelizeUniqueConstraintError'){
            // console.log(error);
            let explanantion = [];
            error.errors.forEach((err)=>{
                explanantion.push(err.message);
            });
            // console.log(explanantion);
            throw new AppError(explanantion,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new city object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function deleteCity(data){
    try{
        const city = await cityRepository.destroy(data);
        return city;
    } catch(error){
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError('The city you requested to delete is not present', error.statusCode);
        }
        throw new AppError('Cannot delete city object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function updateCity(id,data){
    try{
        const city = await cityRepository.update(id,data);
        return city;
    } catch(error){
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError('The city you requested is not present', error.statusCode);
        }
        throw new AppError('Cannot delete city object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createCity,
    deleteCity,
    updateCity
}