const express = require("express");
const airplaneRoute = require("./airplane-routes");
const cityRoute = require("./city-routes");
const airportRoute = require("./airport-routes");

const router = express.Router();
router.use("/airplanes", airplaneRoute);
router.use("/cities", cityRoute);
router.use("/airports", airportRoute);


module.exports = router;
