import Sequelize, { Model } from "sequelize";

class Exchange extends Model {
    static init(sequelize) {
        super.init(
            {
                products: Sequelize.ARRAY(Sequelize.JSON),
                coupon: Sequelize.JSON,
                status: Sequelize.STRING,
                description: Sequelize.STRING,
            },
            {
                sequelize,
                tableName: "exchanges",
            }
        );

        return this;
    }
    static associate(model) {
        this.belongsTo(model.User, {
            foreignKey: "user_id",
            as: "user",
        });
        this.belongsTo(model.Order, {
            foreignKey: "order_id",
            as: "order",
        });
    }
}

export default Exchange;
