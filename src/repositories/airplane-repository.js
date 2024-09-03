const { Airplane } = require("../models");
const CrudRepository = require("./crud-repository");

class AirplaneRepository extends CrudRepository {
  constructor() {
    // console.log(Airplane.toString());
    super(Airplane);
  }
}

module.exports = AirplaneRepository;
