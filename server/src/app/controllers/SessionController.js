import jwt from "jsonwebtoken";
import User from "../models/User";

import authConfig from "../../config/auth";

class SessionController {
    async save(EntityInfo) {
        const { email, password } = EntityInfo;

        const user = await User.findOne({ where: { email: email } });

        if (!(await user.checkPassword(password))) {
            return { session: "Incorrect password." };
        }

        const { id, firstName } = user;

        return {
            user: {
                id,
                firstName,
                email,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        };
    }
}

export default new SessionController();