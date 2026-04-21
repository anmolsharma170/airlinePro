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

module.exports = {
    createCity
}