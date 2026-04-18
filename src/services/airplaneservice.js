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
module.exports = {
    createAirplane
}
// based on what response we got from crud repository we can configure app error directly here