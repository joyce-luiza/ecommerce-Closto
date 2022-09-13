import User from "../models/User";

class ValidateEmail {
    async process(info) {
        if (info.email) {
            if (info.user_id) {
                if (
                    await User.findOne({
                        where: { id: info.user_id, email: info.email },
                    })
                ) {
                    return null;
                }
            }
            let emailFormatValidation =
                /^[a-zA-Z0-9\.]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;

            if (!emailFormatValidation.test(info.email)) {
                return "The email address informed by the user is invalid.";
            }

            if (await User.findOne({ where: { email: info.email } })) {
                return "The email address informed by the user is already in use.";
            }
        }

        return null;
    }
}

export default new ValidateEmail().process;
