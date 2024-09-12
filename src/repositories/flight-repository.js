const { where } = require("sequelize");
const { Flight } = require("../models");
const CrudRepository = require("./crud-repository");

class FlightRepository extends CrudRepository {
    constructor() {
        // console.log(Airplane.toString());
        super(Flight);
    }
    async getAllFlights (filter, sort) {
        const response = await this.model.findAll({
            where: filter,
            order: sort
        });
        return response;
    }
}

module.exports = FlightRepository;