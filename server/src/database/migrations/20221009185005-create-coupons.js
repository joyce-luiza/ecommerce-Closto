"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("coupons", {
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
                allowNull: true,
            },
            code: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            couponType: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            discountType: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            discountValue: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            minValue: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            expiresIn: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            active: {
                type: Sequelize.BOOLEAN,
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
        await queryInterface.dropTable("coupons");
    },
};
