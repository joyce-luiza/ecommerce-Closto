import Sequelize, { Model } from "sequelize";

class Cart extends Model {
    static init(sequelize) {
        super.init(
            {
                products: Sequelize.ARRAY(Sequelize.JSON),
            },
            {
                sequelize,
                tableName: "cart",
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

export default Cart;
