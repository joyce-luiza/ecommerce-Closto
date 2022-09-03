import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                firstName: Sequelize.STRING,
                lastName: Sequelize.STRING,
                birthDate: Sequelize.DATEONLY,
                cpf: Sequelize.STRING(11),
                email: Sequelize.STRING(255),
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
                phoneNumber: Sequelize.STRING(11),
                genre: Sequelize.STRING,
            },
            {
                sequelize,
                tableName: "users",
            }
        );

        this.addHook("beforeSave", async (user) => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });

        return this;
    }
}

export default User;
