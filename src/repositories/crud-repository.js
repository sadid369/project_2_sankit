const { Logger } = require("../config");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    // try {
    //   const response = await this.model.create(data);
    //   return response;

    // } catch (error) {
    //   Logger.error("Something went wrong in the CRUD REPO: create");
    //   console.log(error.toString());
    //   throw error;
    // }
    const response = await this.model.create(data);
    return response;
  }
  async destroy(data) {
    try {
      const response = await this.model.destroy({
        where: {
          id: data,
        },
      });
      return response;
    } catch (error) {
      Logger.error("Something went wrong in the CRUD REPO: destroy");
      throw error;
    }
  }
  async get(data) {
    try {
      const response = await this.model.findByPk(data);
      return response;
    } catch (error) {
      Logger.error("Something went wrong in the CRUD REPO: get");
      throw error;
    }
  }

  async getAll(data) {
    try {
      const response = await this.model.findAll();
      return response;
    } catch (error) {
      Logger.error("Something went wrong in the CRUD REPO: get");
      throw error;
    }
  }
  async update(id, data) {
    // data should be in object
    try {
      const response = await this.model.update(data, {
        where: {
          id: id,
        },
      });
      return response;
    } catch (error) {
      Logger.error("Something went wrong in the CRUD REPO: get");
      throw error;
    }
  }
}

module.exports = CrudRepository;
