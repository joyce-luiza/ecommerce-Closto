import Address from "../models/Address";

class ValidateAddressExistence {

    async process(info) {
        const {
            user_id,
            title,
            type,
            residenceType,
            cep,
            publicPlaceType,
            publicPlace,
            number,
            neighborhood,
            city,
            state,
            country,
            note,
            isPrincipal
        } = info;

        const address = await Address.findOne({
        where: {
            user_id,
            title,
            type,
            residenceType,
            cep,
            publicPlaceType,
            publicPlace,
            number,
            neighborhood,
            city,
            state,
            country,
            note,
            isPrincipal
        }});

        if(address && address.type === info.type && address.user_id === info.user_id){
            return { addressExistence: 'This address is already in registered by this user.' };
        }

        return null;
    }
}

export default new ValidateAddressExistence().process;