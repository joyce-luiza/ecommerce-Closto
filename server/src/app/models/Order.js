import Sequelize, { Model } from 'sequelize';

class Order extends Model {
	static init(sequelize) {
		super.init(
			{
				products: Sequelize.ARRAY(Sequelize.JSON),
				total: Sequelize.FLOAT,
				status: Sequelize.STRING,
				shipping: Sequelize.FLOAT,
				discount: Sequelize.FLOAT,
				coupon: Sequelize.JSON,
				paymentMethod: Sequelize.STRING,
				payment: Sequelize.ARRAY(Sequelize.JSON),
				shippingAddress: Sequelize.JSON,
			},
			{
				sequelize,
				tableName: 'orders',
			}
		);

		return this;
	}
	static associate(model) {
		this.belongsTo(model.User, {
			foreignKey: 'user_id',
			as: 'user',
		});
	}
}

export default Order;
