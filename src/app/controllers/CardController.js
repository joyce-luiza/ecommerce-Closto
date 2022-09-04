import Card from "../models/Card";

class CardController  {
    async show(entityInfo) {
        return await Card.findAll({where: { user_id: entityInfo.user_id }});
    }

    async save(entityInfo) {
        return await Card.create(entityInfo);
    }

    async update(entityInfo) {
        return await (await Card.findByPk(entityInfo.id)).update(entityInfo);
    }

    async delete(entityInfo) {
        return await (await Card.findByPk(entityInfo.id)).destroy();
    }
}

export default new CardController();