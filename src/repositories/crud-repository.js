// repository talks to models
// controllers dont directly talk with models
// services have business logic 
const {Logger} = require('../config')
class CrudRepository{
    constructor(model){
        this.model = model;
    }
    async create(data){
        try{
            const response = await this.model.create(data);
            return response;
        }catch(error){
            Logger.error('Something went wrong in the CRUD repo: create');
            throw error;
        }
    }
    //this create function will help to create some data
    async destroy(data){
        try{
            const response = await this.model.destroy(data)({
                where: {
                    id:data
                }
            });
            return response;
        }catch(error){
            Logger.error('Something went wrong in the CRUD repo: destroy');
            throw error;
        }
    }
    //this create function will help to delete some data
    async get(data){
        try{
            const response = await this.model.findByPk(data);
            return response;
        }catch(error){
            Logger.error('Something went wrong in the CRUD repo: get');
            throw error;
        }
    }
    async update(id,data){  //here data is object
        try{
            const response = await this.model.update(data,{
                where: {
                    id: id 
                }
            });
            return response;
        }catch(error){
            Logger.error('Something went wrong in the CRUD repo: get');
            throw error;
        }
    }
}
module.exports=CrudRepository;