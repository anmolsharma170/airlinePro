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
    async get(data){
        try{
            const response = await this.model.findByPk(data);
            return response;
        }catch(error){
            Logger.error('Something went wrong in the CRUD repo: get');
            throw error;
        }
    }
    async update(id,data){
        try{
            const response = await this.model.findByPk(data,{
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