// services use repositories to intract with the database
const { StatusCodes } = require('http-status-codes');
const {FlightRepository} = require('../repositories');
const {Op} = require('sequelize');
const AppError = require('../utils/errors/app-error');
const flightRepository = new FlightRepository();
const { compareTime } = require('../utils/helpers/datetime-helpers');
async function createFlight(data){
    try{
        const flight = await flightRepository.create(data);
        if(!compareTime(flight.arrival_time, flight.departure_time)){
            throw new AppError('Arrival time cannot be less than departure time', StatusCodes.BAD_REQUEST); //doing this in middleware can be a better option as we can avoid unnecessary database calls if the data is not valid
        }
        return flight;
    } catch(error){
        console.log(error); // Log the actual error to understand why DB creation fails
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
        throw new AppError('Cannot create a new flight object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query){
    let customFilter = {};
    let sortFilter = {};
    const endingtripTime = "23:59:59"; // this will help us to get flights for exact date only
    //trips = MUM-DEL
    // https://www.flipkart.com/travel/flights/search?trips=BOM-BKK-16052026&travellers=2-0-0&class=e&tripType=ONE_WAY&isIntl=true&source=Search%20Form
    // in flipkart flights we can see that for filtering they are using query params and we can also use the same approach to filter the flights based on the query params
    
    // this query.trips will filter out the flight based on the departure and arrival airport eg MUM-DEL
    if(query.trips){
        let [departure_airport_Id, arrival_airport_Id] = query.trips.split("-");
        customFilter.departure_airport_Id = departure_airport_Id;
        customFilter.arrival_airport_Id = arrival_airport_Id;
    }

    // this query.price will filter out the flight based on the price range eg 1000-5000
    if(query.price){
        [minprice, maxprice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [minprice,((maxprice==undefined)?20000:maxprice)]
        } 
    }

    // this query.travellers will filter out the flight based on the number of travellers eg 2
    if(query.travellers){
        customFilter.total_seats = {
            [Op.gte]: query.travellers 
        }
    }
    
    if(query.tripDate){
        customFilter.departure_time = {
            [Op.between]: [query.tripDate, query.tripDate + " " + endingtripTime] 
        }
    }

    if(query.sort){
        const params = query.sort.split(',');
        const sortFilters = params.map((param) => {
            // Find the last underscore to handle fields with underscores like "departure_time_ASC"
            const lastUnderscoreIndex = param.lastIndexOf('_');
            const field = param.substring(0, lastUnderscoreIndex);
            const order = param.substring(lastUnderscoreIndex + 1);
            return [field, order];
        });
        sortFilter = sortFilters;
    }
    try {
        const flights = await flightRepository.getAllFlights(customFilter,sortFilter );
        return flights; 
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot fetch data of all the flights',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createFlight,
    getAllFlights
}
// based on what response we got from crud repository we can configure app error directly here