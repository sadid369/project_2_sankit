const { Flight } = require("../models");
const CrudRepository = require("./crud-repository");

class FlightRepository extends CrudRepository {
    constructor() {
        // console.log(Airplane.toString());
        super(Flight);
    }
}

module.exports = FlightRepository;