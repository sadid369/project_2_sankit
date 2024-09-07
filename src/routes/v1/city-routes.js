const express = require("express");
const { CityController } = require("../../controllers");
const { CityMiddlewares } = require("../../middlewares");


const router = express.Router();

router.post(
    "/",
    CityMiddlewares.validateCreateCity,
    CityController.createCity
);

module.exports = router;