const express = require("express");
const { InfoController } = require("../../controllers");
const airplaneRoute = require("./airplane-routes");
const router = express.Router();
router.use("/airplanes", airplaneRoute);
router.get("/info", InfoController);

module.exports = router;
