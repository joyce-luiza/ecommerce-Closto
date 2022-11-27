import Coupon from "../models/Coupon";

class CouponController {
    async index(entityInfo) {
        const coupon = await Coupon.findOne({
            where: { code: entityInfo.code, userId: entityInfo.user_id },
        });
        return coupon;
    }

    async show(entityInfo) {
        return await Coupon.findAll({
            where: { userId: entityInfo.user_id },
        });
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
