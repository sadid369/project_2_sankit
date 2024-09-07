const express = require("express");
const airplaneRoute = require("./airplane-routes");
const cityRoute = require("./city-routes");

const router = express.Router();
router.use("/airplanes", airplaneRoute);
router.use("/cities", cityRoute);


module.exports = router;
