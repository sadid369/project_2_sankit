const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { compareTime } = require("../utils/helpers.js/datetime-helpers");

function validateCreateRequest (req, res, next) {
    if (!req.body.flightNumber) {
        ErrorResponse.message = "Something went wrong while creating flight",
            ErrorResponse.error = new AppError([
                "flightNumber Not Found in the incoming request in the correct form",
            ]);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if (!req.body.airplaneId) {
        ErrorResponse.message = "Something went wrong while creating flight",
            ErrorResponse.error = new AppError([
                "airplaneId Not Found in the incoming request in the correct form",
            ]);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if (!req.body.departureAirportId) {
        ErrorResponse.message = "Something went wrong while creating flight",
            ErrorResponse.error = new AppError([
                "departureAirportId Not Found in the incoming request in the correct form",
            ]);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if (!req.body.arrivalAirportId) {
        ErrorResponse.message = "Something went wrong while creating flight",
            ErrorResponse.error = new AppError([
                "arrivalAirportId Not Found in the incoming request in the correct form",
            ]);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if (!req.body.arrivalTime) {
        ErrorResponse.message = "Something went wrong while creating flight",
            ErrorResponse.error = new AppError([
                "arrivalTime Not Found in the incoming request in the correct form",
            ]);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if (!req.body.departureTime) {
        ErrorResponse.message = "Something went wrong while creating flight",
            ErrorResponse.error = new AppError([
                "departureTime Not Found in the incoming request in the correct form",
            ]);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    const departure = new Date(req.body.departureTime).getTime();
    const arrival = new Date(req.body.arrivalTime).getTime();
    console.log(departure < arrival);
    if (!compareTime(arrival, departure)) {
        ErrorResponse.message = "Something went wrong while creating flight",
            ErrorResponse.error = new AppError([
                "departureTime cannot be grater then arrivalTime ",
            ]);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if (!req.body.price) {
        ErrorResponse.message = "Something went wrong while creating flight",
            ErrorResponse.error = new AppError([
                "price Not Found in the incoming request in the correct form",
            ]);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if (!req.body.totalSeats) {
        ErrorResponse.message = "Something went wrong while creating flight",
            ErrorResponse.error = new AppError([
                "totalSeats Not Found in the incoming request in the correct form",
            ]);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest,
};

//