const Sequelize = require('sequelize');
const sequelize = require('../utils/database');


const Model = Sequelize.Model;

class User extends Model {
}


User.init({
        status: {
            type: Sequelize.STRING,
            defaultValue: 'ACTIVE'
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },


    },
    {
        sequelize,
        modelName: 'user',

    });
const Profile = require('./Profile');
const Messages = require('./Messages');
const Friends = require('./Friends');
User.belongsTo(Profile);
User.hasMany(Messages, {foreignKey: 'from_id'});
User.hasMany(Messages, {foreignKey: 'to_id'});
User.belongsToMany(User, {through:'Friends', as:'friends',foreignKey: 'user_id'});
// User.belongsToMany(User, {as: 'friend', foreignKey: 'friend_id'});
module.exports = User;
