import User from "../models/User";

class UserController {
    async index(entityInfo) {
        return await User.findByPk(entityInfo.user_id);
    }

    async save(entityInfo) {
        return await User.create(entityInfo);
    }

    async update(entityInfo) {
        return await (await User.findByPk(entityInfo.user_id)).update(entityInfo)
    }

    async delete(entityInfo) {
        return await (await User.findByPk(entityInfo.user_id)).destroy();
    }
}

export default new UserController();
