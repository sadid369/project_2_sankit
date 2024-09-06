const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createAirplane(req, res) {
  try {
    console.log(req.body);
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });

    SuccessResponse.data = airplane;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    (ErrorResponse.error = error),
      (ErrorResponse.message = "Something went wrong while creating airplane");
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createAirplane,
};
