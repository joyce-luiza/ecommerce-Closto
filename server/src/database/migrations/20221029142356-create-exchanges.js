"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("exchanges", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: { model: "users", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
                allowNull: false,
            },
            order_id: {
                type: Sequelize.INTEGER,
                references: { model: "orders", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
                allowNull: false,
            },
            products: {
                type: Sequelize.ARRAY(Sequelize.JSON),
                allowNull: false,
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            coupon: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            description: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable("exchanges");
    },
};
