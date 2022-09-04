import jwt from "jsonwebtoken";
import { promisify } from "util";
import auth from "../../config/auth";

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ tokenAuth: "Token does not exist" });
    }

    const [, token] = authHeader.split(" ");

    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);
        req.body.user_id = decoded.id;
        return next();
    } catch (err) {
        return res.status(401).json({ tokenAuth: "Invalid token" });
    }
};
