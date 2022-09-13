import User from "../models/User";

class ValidateEmailExistence {

    async process(info) {
        if(info.email && !(await User.findOne({ where: { email: info.email } }))){
            return 'The email address does not exist.';
        }

        return null;
    }

}

export default new ValidateEmailExistence().process;
