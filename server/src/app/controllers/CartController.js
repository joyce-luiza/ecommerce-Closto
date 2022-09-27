import Cart from "../models/Cart";

class CartController {
    async show(entityInfo) {
        try {
            const cart = await Cart.findOne({where: {user_id: entityInfo.user_id}})
            return cart.products
        } catch (error) {
            return {error: error.message}
        }
    }

    async save(entityInfo) {
        return await Cart.create(entityInfo);
    }

    async update(entityInfo) {
        try {
            return await (await Cart.findOne({where: { user_id: entityInfo.user_id}})).update(entityInfo)
        } catch (error) {
            return {error: error.message}
        }
    }

    async delete(entityInfo) {
        return await (await Cart.findByPk(entityInfo.id)).destroy();
    }
}

export default new CartController();
