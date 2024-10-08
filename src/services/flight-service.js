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
    let sortFilter = [];
    const endingTripeTime = " 23:59:00";
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
    if (query.tripDate) {
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingTripeTime]
        };
    }
    if (query.sort) {
        const params = query.sort.split(',');
        const sortFilters = params.map((param) => param.split('_'));
        sortFilter = [...sortFilters];
    }
    console.log(customFilter);
    console.log(sortFilter);
    try {
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch (error) {
        console.log(error);
        throw new AppError(
            "Cannot fetch all data of all the airport",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}
async function getFlight (id) {
    try {
        const flight = await flightRepository.get(id);

        return flight;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(
                "The flight you requested is not present",
                error.statusCode
            );
        }
        throw new AppError(
            "Cannot fetch the data of  that flight",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}
async function updateSeats (data) {
    try {
        const response = await flightRepository.updateRemainingSeats(data.flightId, data.seats, data.dec);
        return response;
    } catch (error) {
        console.log(error);
        throw new AppError(
            "Cannot update the data of  that flight",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}
module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
};
