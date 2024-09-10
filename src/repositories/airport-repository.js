const { Airport } = require("../models");
const CrudRepository = require("./crud-repository");

class AirportRepository extends CrudRepository {
    constructor() {
        // console.log(Airplane.toString());
        super(Airport);
    }
}

module.exports = AirportRepository;