const { where } = require("sequelize");
const { Flight } = require("../models");
const CrudRepository = require("./crud-repository");

class FlightRepository extends CrudRepository {
    constructor() {
        // console.log(Airplane.toString());
        super(Flight);
    }
    async getAllFlights (filter) {
        const response = await this.model.findAll({
            where: filter
        });
        return response;
    }
}

module.exports = FlightRepository;