const { City } = require("../models");
const CrudRepository = require("./crud-repository");

class CityRepository extends CrudRepository {
    constructor() {
        // console.log(Airplane.toString());
        super(City);
    }
}

module.exports = CityRepository;