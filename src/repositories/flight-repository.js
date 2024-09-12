
const CrudRepository = require("./crud-repository");
const { Sequelize } = require('sequelize');
const { Flight, Airplane, Airport, City } = require('../models');


class FlightRepository extends CrudRepository {
    constructor() {
        // console.log(Airplane.toString());
        super(Flight);
    }
    async getAllFlights (filter, sort) {
        const response = await this.model.findAll({
            where: filter,
            order: sort,
            include: [

                {
                    model: Airplane,
                    required: true,
                    as: 'airplaneDetail',
                },
                {
                    model: Airport,
                    required: true,
                    as: 'departureAirport',
                    on: {
                        col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departureAirport.code"))
                    },
                    include: {
                        model: City,
                        required: true
                    }
                },
                {
                    model: Airport,
                    required: true,
                    as: 'arrivalAirport',
                    on: {
                        col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirport.code"))
                    },
                    include: {
                        model: City,
                        required: true
                    }
                }
            ]
        });
        return response;
    }
}

module.exports = FlightRepository;