import Cart from "../models/Cart";

class CartController {
    async show(entityInfo) {
        return await Cart.findAll({
            where: { user_id: entityInfo.user_id },
        });
    }

    async save(entityInfo) {
        return await Cart.create(entityInfo);
    }

    async update(entityInfo) {
        return await (await Cart.findByPk(entityInfo.id)).update(entityInfo);
    }

    async delete(entityInfo) {
        return await (await Cart.findByPk(entityInfo.id)).destroy();
    }
}

export default new CartController();
