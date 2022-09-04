import Card from "../models/Card";

class CardController  {
    index(EntityInfo) {
        const status = EntityInfo;
        return status;
    }

    async save(EntityInfo) {
        return await Card.create(EntityInfo);
    }

    update(EntityInfo) {
        const status = EntityInfo;
        return status;
    }

    delete(EntityInfo) {
        const status = EntityInfo;
        return status;
    }
}

export default new CardController();