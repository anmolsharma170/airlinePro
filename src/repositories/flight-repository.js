const CrudRepository = require('./crud-repository');
const {Flights} = require('../models');
class FlightRepository extends CrudRepository{
    constructor(){
        super(Flights);
    }

    async getAllFlights(filter){
        const response = await Flights.findAll({
            where:filter 
        });
        return response;
    }
}
module.exports=FlightRepository;