const express = require('express');
const {ServerConfig, Logger} = require('./config');
const apiRoutes = require('./routes');
const app = express(); 
// express js doesnot know how to read your url body
// so we have to make express to ready body like a json
// aap.use() is going to register middleware for all upcoming routes
app.use(express.json());
app.use(express.urlencoded({extended: true}));  //extended true or false doesnot matter it is just for choosing library 1)query string(false) and 2)qs lib(true)
app.use('/api',apiRoutes);
app.listen(ServerConfig.PORT,async()=>{
    console.log(`Successfully started the server on PORT: ${ServerConfig.PORT}`);
    Logger.info("Successfully started the server", {});

    // temp code 
    // this  is temporary code what we are doing here is we are having citie in our cities db we are fetching it using pk and we are trying create a airport using it and the moment we detroy the City city and the airport belonging to that city both gets deleted
    const {AirplaneController,City} = require('./models');
    // const city = await City.findByPk(3);
    // await city.createAirport({name: 'Delhi Airport', code: 'DEL'});
    await City.destroy({
        where: {
            id:3
        }
    }) 
})