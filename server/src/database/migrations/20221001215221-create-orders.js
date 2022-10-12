'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('orders', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			user_id: {
				type: Sequelize.INTEGER,
				references: { model: 'users', key: 'id' },
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
				allowNull: false,
			},
			products: {
				type: Sequelize.ARRAY(Sequelize.JSON),
				allowNull: false,
			},
			total: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			status: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			shipping: {
				type: Sequelize.FLOAT,
			},
			discount: {
				type: Sequelize.FLOAT,
				allowNull: true,
			},
			coupon: {
				type: Sequelize.JSON,
				allowNull: true,
			},
			paymentMethod: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			payment: {
				type: Sequelize.ARRAY(Sequelize.JSON),
				allowNull: false,
			},
			shippingAddress: {
				type: Sequelize.JSON,
				allowNull: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable('orders');
	},
};
