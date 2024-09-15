
const CrudRepository = require("./crud-repository");
const { Sequelize } = require('sequelize');
const { Flight, Airplane, Airport, City } = require('../models');
const db = require('../models');
const { addRowLockOnFlights } = require('./queries');
class FlightRepository extends CrudRepository {
    constructor() {
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
    async updateRemainingSeats (flightId, seats, dec = true) {
        await db.sequelize.query(addRowLockOnFlights(flightId));
        const flight = await Flight.findByPk(flightId);
        try {
            if (parseInt(dec)) {
                const response = await flight.decrement('totalSeats', { by: seats });
            } else {
                const response = await flight.increment('totalSeats', { by: seats });
            }

            return flight;
        } catch (error) {
            console.log("In updateRemainingSeats Function" + error);
        }
    }

}



module.exports = FlightRepository;