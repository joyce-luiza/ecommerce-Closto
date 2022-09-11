import Sequelize, { Model } from 'sequelize';

class Card extends Model {
    static init(sequelize) {
        super.init(
            {
                cardHolderName: Sequelize.STRING(50),
                number: Sequelize.STRING(16),
                serviceCode: Sequelize.STRING(3),
                flag: Sequelize.STRING,
            },
            {
                sequelize,
                tableName: 'cards'
            }
        );

        return this;
    }

    static associate(model) {
        this.belongsTo(model.User, { foreignKey: 'user_id', as: 'user' });
    }
}

export default Card;
