import Sequelize, { Model } from "sequelize";

class Coupon extends Model {
    static init(sequelize) {
        super.init(
            {
                userId: Sequelize.INTEGER,
                code: Sequelize.STRING,
                couponType: Sequelize.STRING,
                discountType: Sequelize.STRING,
                discountValue: Sequelize.FLOAT,
                minValue: Sequelize.FLOAT,
                expiresIn: Sequelize.DATE,
                quantity: Sequelize.INTEGER,
                active: Sequelize.BOOLEAN,
            },
            {
                sequelize,
                tableName: "coupons",
            }
        );

        return this;
    }
}

export default Coupon;
