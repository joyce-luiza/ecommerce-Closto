import Sequelize from "sequelize";
import dbConfig from "../config/database";

import User from "../app/models/User";
import Card from "../app/models/Card";
import Address from "../app/models/Address";

const models = [User, Card, Address];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(dbConfig);

        models
            .map((model) => model.init(this.connection))
            .map(
                (model) =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();