import Order from "../models/Order";

class OrderController {
    async show(entityInfo) {
        return await Order.findAll({ where: { user_id: entityInfo.user_id } });
    }

    async save(entityInfo) {
        return await Order.create(entityInfo);
    }

    async update(entityInfo) {
        return await (await Order.findByPk(entityInfo.id)).update(entityInfo);
    }

    async delete(entityInfo) {
        return await (await Order.findByPk(entityInfo.id)).destroy();
    }
}

export default new OrderController();
