const {Op, Sequelize} = require('sequelize');
const CrudRepository = require('./crud-repository');
const {Flights, Airplane, Airport, City} = require('../models');
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
                model: Airplane,  // this is join of airplane
                required: true, // this will make sure that we only get the flights which have the airplane details and if we set it to false then we will get all the flights even if they don't have the airplane details
                as: 'airplaneDetails' ,
                
            },
            {
                model: Airport,  // this is join of departure airport
                required: true,
                as: 'departureAirportDetails',
                on:{
                    col1: Sequelize.where(Sequelize.col('Flights.departure_airport_Id'), '=', Sequelize.col('departureAirportDetails.code'))  // this will make sure that we are joining the flights table with the airport table based on the departure_airport_Id and code of the airport table and this will help us to get the details of the departure airport in the response of the flight details
                },
                include:{   // inside airport this is join of city table to get the details of the city in which the airport is located and we are joining the airport table with the city table based on the cityId and id of the city table
                    model: City,
                    required: true,
                    as: 'cityDetails', //this will help us to get the details of the city in which the airport is located and we are joining the airport table with the city table based on the cityId and id of the city table
                } 
            },
            {
                model: Airport,
                required: true,
                as: 'arrivalAirportDetails',
                on:{
                    col1: Sequelize.where(Sequelize.col('Flights.arrival_airport_Id'), '=', Sequelize.col('arrivalAirportDetails.code'))
                },
                include:{
                    model: City,
                    required: true,
                    as: 'cityDetails', //this will help us to get the details of the city in which the airport is located and we are joining the airport table with the city table based on the cityId and id of the city table
                }
            },

        ]
        });
        return response;
    }
    async updateRemainingSeats(flightId,seats,dec=true){
        const flight = await Flights.findByPk(flightId);
        if(Number(dec)){
            await flight.decrement('total_seats', { by: seats });
        }
        else{
            await flight.increment('total_seats', { by: seats});
        }
        await flight.reload();
        return flight;
    }
}


module.exports=FlightRepository;