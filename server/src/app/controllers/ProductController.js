import Product from "../models/Product";

class ProductController {
    async index(entityInfo) {
        return await Product.findByPk(entityInfo.id);
    }

    async show(entityInfo) {
        return await Product.findAll();
    }

    async save(entityInfo) {
        return await Product.create(entityInfo);
    }

    async update(entityInfo) {
        return await (await Product.findByPk(entityInfo.id)).update(entityInfo);
    }

    async delete(entityInfo) {
        return await (await Product.findByPk(entityInfo.id)).destroy();
    }
}

export default new ProductController();
