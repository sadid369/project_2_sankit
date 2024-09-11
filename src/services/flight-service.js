const { StatusCodes } = require("http-status-codes");
const { Op } = require('sequelize');
const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const flightRepository = new FlightRepository();
async function createFlight (data) {
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        if (error.name == "SequelizeValidationError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError(
            "Cannot create a new flight object",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function getAllFlights (query) {
    //tripes = MUM-DEL
    let customFilter = {};
    if (query.trips) {
        [departureAirportId, arrivalAirportId] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
        //TODO: add check they ar not same 
    }
    if (query.price) {
        [minPrice, maxPrice] = query.price.split("-");
        console.log(minPrice, maxPrice);
        customFilter.price = {
            [Op.between]: [minPrice, (maxPrice == undefined) ? 20000 : maxPrice]
        };
    }
    if (query.travelers) {
        customFilter.totalSeats = {
            [Op.gte]: query.travelers
        };
    }
    console.log(customFilter);
    try {
        const flights = await flightRepository.getAllFlights(customFilter);
        return flights;
    } catch (error) {
        throw new AppError(
            "Cannot fetch all data of all the airport",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

module.exports = {
    createFlight,
    getAllFlights
};
