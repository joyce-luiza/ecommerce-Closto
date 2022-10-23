import Order from '../models/Order';

class OrderController {
	async index(entityInfo) {
		return await Order.findByPk(entityInfo.id);
	}

	async show(entityInfo) {
		return await Order.findAll();
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
