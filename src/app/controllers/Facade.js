import UserController from "./UserController";
import SessionController from "./SessionController";

import ValidatePassword from "../strategies/ValidatePassword";
import CardController from "./CardController";
import AddressControllers from "./AddressControllers";

class Facade {
    controllers = new Map();
    strategies = new Map();

    constructor() {
        this.controllers.set("/users", UserController);
        this.controllers.set("/session", SessionController);
        this.controllers.set("/user/cards", CardController);
        this.controllers.set("/user/addresses", AddressControllers);

        this.strategies.set("/users", [ValidatePassword]);
    }

    async save(entityType, entityInfo) {
        const entityController = this.controllers.get(entityType);
        const entityStrategies = this.strategies.get(entityType);

        const errors = [];

        if (entityStrategies) {
            for (
                let index = 0;
                index < Object.keys(entityStrategies).length;
                index++
            ) {
                let validation = await entityStrategies[index](entityInfo);

                if (validation != null) errors.push(validation);
            }
        }

        if (errors.length > 0) {
            return errors;
        }

        return await entityController.save(entityInfo);
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
        const entityStrategies = this.strategies.get(entityType);

        const errors = [];

        if (entityStrategies) {
            for (
                let index = 0;
                index < Object.keys(entityStrategies).length;
                index++
            ) {
                let validation = await entityStrategies[index](entityInfo);

                if (validation != null) errors.push(validation);
            }
        }

        if (errors.length > 0) {
            return errors;
        }

        return await entityController.update(entityInfo);
    }

    delete(entityType, entityInfo) {
        const entityController = this.controllers.get(entityType);
        return entityController.delete(entityInfo);
    }
}

export default new Facade();
