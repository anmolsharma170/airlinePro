const CrudRepository = require('./crud-repository');
const {Flights} = require('../models');
class FlightRepository extends CrudRepository{
    constructor(){
        super(Flights);
    }
}
module.exports=FlightRepository;