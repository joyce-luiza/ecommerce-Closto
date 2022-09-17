import Sequelize, { Model } from 'sequelize';

class Product extends Model {
    static init(sequelize) {
        super.init(
            {
                category: Sequelize.STRING,
                name: Sequelize.STRING,
                color: Sequelize.STRING,
                size: Sequelize.STRING,
                composition: Sequelize.STRING,
                price:  Sequelize.FLOAT,
                quantity: Sequelize.INTEGER,
                description: Sequelize.STRING,
                status: Sequelize.STRING,
                onSale: Sequelize.BOOLEAN,
                discount: Sequelize.INTEGER,
            },
            {
                sequelize,
                tableName: 'products',
            }
        );

        return this;
    }
}

export default Product;
