import Coupon from "../models/Coupon";

class CouponController {
    async index(entityInfo) {
        return await Coupon.findByPk(entityInfo.id);
    }

    async show(entityInfo) {
        return await Coupon.findAll();
    }

    async save(entityInfo) {
        return await Coupon.create(entityInfo);
    }

    async update(entityInfo) {
        return await (await Coupon.findByPk(entityInfo.id)).update(entityInfo);
    }

    async delete(entityInfo) {
        return await (await Coupon.findByPk(entityInfo.id)).destroy();
    }
}

export default new CouponController();
