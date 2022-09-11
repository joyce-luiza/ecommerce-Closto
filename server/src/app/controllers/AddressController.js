import Address from "../models/Address";

class AddressController {
    async show(entityInfo) {
        return await Address.findAll({
            where: { user_id: entityInfo.user_id },
        });
    }

    async save(entityInfo) {
        return await Address.create(entityInfo);
    }

    async update(entityInfo) {
        return await (await Address.findByPk(entityInfo.id)).update(entityInfo);
    }

    async delete(entityInfo) {
        return await (await Address.findByPk(entityInfo.id)).destroy();
    }
}

export default new AddressController();
