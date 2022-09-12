import UserController from "./UserController";
import SessionController from "./SessionController";
import CardController from "./CardController";
import AddressController from "./AddressController";

import ValidatePassword from "../strategies/ValidatePassword";
import ValidateEmail from "../strategies/ValidateEmail";
import ValidateEmailExistence from "../strategies/ValidateEmailExistence";
import ValidateAddressExistence from "../strategies/ValidateAddressExistence";
import ValidatePrincipalAddress from "../strategies/ValidatePrincipalAddress";

class Facade {
    controllers = new Map();
    strategies = new Map();

    constructor() {
        this.controllers.set("/users", UserController);
        this.controllers.set("/session", SessionController);
        this.controllers.set("/user/cards", CardController);
        this.controllers.set("/user/addresses", AddressController);

        this.strategies.set("/users", [ValidatePassword, ValidateEmail]);
        this.strategies.set("/session", [ValidateEmailExistence]);
        this.strategies.set("/user/addresses", [ValidateAddressExistence, ValidatePrincipalAddress]);
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
        return await entityController.index(entityInfo);
    }

    async show(entityType, entityInfo) {
        const entityController = this.controllers.get(entityType);
        return await entityController.show(entityInfo);
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
