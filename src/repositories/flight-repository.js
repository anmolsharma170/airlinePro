const {Op, Sequelize} = require('sequelize');
const CrudRepository = require('./crud-repository');
const {Flights, Airplane, Airport} = require('../models');
class FlightRepository extends CrudRepository{
    constructor(){
        super(Flights);
    }

    async getAllFlights(filter, sort){
        const response = await Flights.findAll({
            where:filter ,
            order: sort,
            include:[
                {
                model: Airplane,
                required: true, // this will make sure that we only get the flights which have the airplane details and if we set it to false then we will get all the flights even if they don't have the airplane details
                as: 'airplaneDetails'  
            },
            {
                model: Airport,
                required: true,
                as: 'departureAirportDetails',
                on:{
                    col1: Sequelize.where(Sequelize.col('Flights.departure_airport_Id'), '=', Sequelize.col('departureAirportDetails.code'))
                }
            },
            {
                model: Airport,
                required: true,
                as: 'arrivalAirportDetails',
                on:{
                    col1: Sequelize.where(Sequelize.col('Flights.arrival_airport_Id'), '=', Sequelize.col('arrivalAirportDetails.code'))
                }
            },

        ]
        });
        return response;
    }
}
module.exports=FlightRepository;