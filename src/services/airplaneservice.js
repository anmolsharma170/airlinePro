// services use repositories to intract with the database

const {AirplaneRepository} = require('../repositories');
const airplanerepository = new AirplaneRepository();
async function createAirplane(data){
    try{
        const airplane = await airplanerepository.create(data);
        return airplane;
    } catch(error){
        throw error;
    }
}
module.exports = {
    createAirplane
}