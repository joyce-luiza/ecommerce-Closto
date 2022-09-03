class Facade {
    controllers = new Map();
    strategies = new Map();

    async save(EntityType, EntityInfo) {
        return { ok: true };
    }

    async consult(EntityType, EntityInfo) {
        return { ok: true };
    }

    async update(EntityType, EntityInfo) {
        return { ok: true };
    }

    delete(EntityType, EntityInfo) {
        return { ok: true };
    }
}

export default new Facade();