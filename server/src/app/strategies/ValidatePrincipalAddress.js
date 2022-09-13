import Address from "../models/Address";

class ValidatePrincipalAddress {

    async process(info) {
        const {
            user_id,
            isPrincipal
        } = info;

        if(isPrincipal) {
            const principalAddress = await Address.findOne({ where: {
                user_id,
                isPrincipal
            }})

            if(principalAddress){
                await principalAddress.update({ isPrincipal: false });
            }

            return null;
        }
        return null;
    }
}

export default new ValidatePrincipalAddress().process;