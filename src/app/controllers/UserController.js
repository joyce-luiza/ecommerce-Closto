import User from "../models/User";

class UserController {
    async show(entityInfo) {
        return { ok: true };
    }

    async index(entityInfo) {
        return { ok: true };
    }

    async save(entityInfo) {
        return await User.create(entityInfo);
    }

    async update(entityInfo) {
        return { ok: true };
    }

    async delete(entityInfo) {
        return { ok: true };
    }
}

export default new UserController();
