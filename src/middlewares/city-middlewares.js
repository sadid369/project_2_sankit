const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateCity (req, res, next) {
    if (!req.body.name) {
        (ErrorResponse.message = "Something went wrong while creating city"),
            (ErrorResponse.error = new AppError([
                "City Name Not Found in the incoming request in the correct form",
            ]));
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateCity,
};
