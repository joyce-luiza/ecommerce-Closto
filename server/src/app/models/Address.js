import Sequelize, { Model } from "sequelize";

class Address extends Model {
    static init(sequelize) {
        super.init(
            {
                type: Sequelize.STRING,
                residenceType: Sequelize.STRING,
                cep: Sequelize.STRING(8),
                publicPlaceType: Sequelize.STRING,
                publicPlace: Sequelize.STRING,
                number: Sequelize.INTEGER,
                neighborhood: Sequelize.STRING,
                city: Sequelize.STRING,
                state: Sequelize.STRING,
                country: Sequelize.STRING,
                note: Sequelize.STRING,
            },
            {
                sequelize,
                tableName: "addresses",
            }
        );

        return this;
    }

    static associate(model) {
        this.belongsTo(model.User, {
            foreignKey: "user_id",
            as: "user",
        });
    }
}

export default Address;
