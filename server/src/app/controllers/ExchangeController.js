import Exchange from "../models/Exchange";

class ExchangeController {
    async show(entityInfo) {
        return await Exchange.findAll({
            where: { user_id: entityInfo.user_id },
        });
    }

    async save(entityInfo) {
        return await Exchange.create(entityInfo);
    }

    async update(entityInfo) {
        return await (
            await Exchange.findByPk(entityInfo.id)
        ).update(entityInfo);
    }

    async delete(entityInfo) {
        return await (await Exchange.findByPk(entityInfo.id)).destroy();
    }
}

export default new ExchangeController();
