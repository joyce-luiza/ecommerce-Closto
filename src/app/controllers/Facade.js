import UserController from "./UserController";

class Facade {
    controllers = new Map();
    strategies = new Map();

    constructor() {
        this.controllers.set('/users', UserController);
    }

    async save(entityType, entityInfo) {
        const entityController = this.controllers.get(entityType);
        return entityController.save(entityInfo);
    }

    async index(entityType, entityInfo) {
        const entityController = this.controllers.get(entityType);
        return entityController.index(entityInfo);
    }

    async show(entityType, entityInfo) {
        const entityController = this.controllers.get(entityType);
        return entityController.show(entityInfo);
    }

    async update(entityType, entityInfo) {
        const entityController = this.controllers.get(entityType);
        return entityController.update(entityInfo);
    }

    delete(entityType, entityInfo) {
        const entityController = this.controllers.get(entityType);
        return entityController.delete(entityInfo);
    }
}

export default new Facade();
