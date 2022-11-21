import User from "../models/User";
import Address from "../models/Address";
import Product from "../models/Product";
import Order from "../models/Order";
import Coupon from "../models/Coupon";
import Exchange from "../models/Exchange";

class AdminController {
    async show(entityInfo) {
        const admin = await User.findOne({
            where: { id: entityInfo.user_id, isAdmin: entityInfo.isAdmin },
        });
        if (admin) {
            try {
                switch (entityInfo.table) {
                    case "/users":
                        return await User.findAll();
                    case "/addresses":
                        return await Address.findAll();
                    case "/products":
                        return await Product.findAll();
                    case "/orders":
                        return await Order.findAll();
                    case "/coupons":
                        return await Coupon.findAll();
                    case "/exchanges":
                        return await Exchange.findAll();
                    default:
                        return { error: "Table not found!" };
                }
            } catch (error) {
                return { error: error.message };
            }
        }

        return { error: "Only an admin can access this content!" };
    }

    async save(entityInfo) {
        const admin = await User.findOne({
            where: { id: entityInfo.user_id, isAdmin: entityInfo.isAdmin },
        });
        entityInfo.user_id = entityInfo.userId;

        if (admin) {
            try {
                switch (entityInfo.table) {
                    case "/users":
                        return await User.create(entityInfo);
                    case "/addresses":
                        return await Address.create(entityInfo);
                    case "/products":
                        return await Product.create(entityInfo);
                    case "/orders":
                        return await Order.create(entityInfo);
                    case "/coupons":
                        return await Coupon.create(entityInfo);
                    case "/exchanges":
                        return await Exchange.create(entityInfo);
                    default:
                        return { error: "Table not found!" };
                }
            } catch (error) {
                return { error: error.message };
            }
        }

        return { error: "Only an admin can access this content!" };
    }

    async update(entityInfo) {
        const admin = await User.findOne({
            where: { id: entityInfo.user_id, isAdmin: entityInfo.isAdmin },
        });

        if (admin) {
            try {
                switch (entityInfo.table) {
                    case "/users":
                        return await (
                            await User.findByPk(entityInfo.id)
                        ).update(entityInfo);
                    case "/addresses":
                        return await (
                            await Address.findByPk(entityInfo.id)
                        ).update(entityInfo);
                    case "/products":
                        return await (
                            await Product.findByPk(entityInfo.id)
                        ).update(entityInfo);
                    case "/orders":
                        console.log(entityInfo);
                        return await (
                            await Order.findByPk(entityInfo.id)
                        ).update({ status: entityInfo.status });
                    case "/coupons":
                        return await (
                            await Coupon.findByPk(entityInfo.id)
                        ).update(entityInfo);
                    case "/exchanges":
                        return await (
                            await Exchange.findByPk(entityInfo.id)
                        ).update({ status: entityInfo.status });
                    default:
                        return { error: "Table not found!" };
                }
            } catch (error) {
                return { error: error.message };
            }
        }

        return { error: "Only an admin can access this content!" };
    }

    async delete(entityInfo) {
        const admin = await User.findOne({
            where: { id: entityInfo.user_id, isAdmin: entityInfo.isAdmin },
        });

        if (admin) {
            try {
                switch (entityInfo.table) {
                    case "/users":
                        return await User.destroy({
                            where: { id: entityInfo.id },
                        });
                    case "/addresses":
                        return await Address.destroy({
                            where: { id: entityInfo.id },
                        });
                    case "/products":
                        return await Product.destroy({
                            where: { id: entityInfo.id },
                        });
                    case "/orders":
                        return await Order.destroy({
                            where: { id: entityInfo.id },
                        });
                    case "/coupons":
                        return await Coupon.destroy({
                            where: { id: entityInfo.id },
                        });
                    case "/exchanges":
                        return await Exchange.destroy({
                            where: { id: entityInfo.id },
                        });

                    default:
                        return { error: "Table not found!" };
                }
            } catch (error) {
                return { error: error.message };
            }
        }

        return { error: "Only an admin can access this content!" };
    }
}

export default new AdminController();
