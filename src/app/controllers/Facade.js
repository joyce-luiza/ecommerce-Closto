import UserController from "./UserController";

class Facade {
    controllers = new Map();
    strategies = new Map();

    async save(entityType, entityInfo) {
        return await UserController.save(entityInfo);
    }

    async consult(entityType, entityInfo) {
        return { ok: true };
    }

    async update(entityType, entityInfo) {
        return { ok: true };
    }

    delete(entityType, entityInfo) {
        return { ok: true };
    }
}

export default new Facade();
