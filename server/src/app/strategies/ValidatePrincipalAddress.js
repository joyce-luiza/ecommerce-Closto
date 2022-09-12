import Address from "../models/Address";

class ValidatePrincipalAddress {

    async process(info) {
        const {
            user_id,
            isPrincipal
        } = info;

        if(isPrincipal) {
            console.log("Foi mandado True")
            const principalAddress = await Address.findOne({ where: {
                user_id,
                isPrincipal
            }})

            if(principalAddress){
                await principalAddress.update({ isPrincipal: false });
                console.log("Alteração efetuada")
            }

            return null;
        }

        console.log("Foi mandado false");
        return null;
    }
}

export default new ValidatePrincipalAddress().process;