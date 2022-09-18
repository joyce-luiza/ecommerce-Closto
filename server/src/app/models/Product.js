import Sequelize, { Model } from "sequelize";

class Product extends Model {
    static init(sequelize) {
        super.init(
            {
                category: Sequelize.STRING,
                name: Sequelize.STRING,
                color: Sequelize.ARRAY(Sequelize.JSON),
                size: Sequelize.ARRAY(Sequelize.JSON),
                composition: Sequelize.STRING,
                price: Sequelize.FLOAT,
                quantity: Sequelize.INTEGER,
                status: Sequelize.STRING,
                description: Sequelize.STRING,
                onSale: Sequelize.BOOLEAN,
                discount: Sequelize.INTEGER,
            },
            {
                sequelize,
                tableName: "products",
            }
        );

        return this;
    }
}

export default Product;
