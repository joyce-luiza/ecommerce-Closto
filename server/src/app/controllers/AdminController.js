import User from "../models/User";
import Address from "../models/Address";
import Product from "../models/Product";

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
                        return await User.findByPk({
                            where: { id: entityInfo.id },
                        }).update(entityInfo);
                    case "/addresses":
                        return await Address.findByPk({
                            where: { id: entityInfo.id },
                        }).update(entityInfo);
                    case "/products":
                        return await Product.findByPk({
                            where: { id: entityInfo.id },
                        }).update(entityInfo);
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
