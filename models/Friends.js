const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Model = Sequelize.Model;

class Friends extends Model {
}

Friends.init({
    user_id: {
        type: Sequelize.INTEGER,

    },
    friendId: {
        type: Sequelize.INTEGER,

    }
}, {
    sequelize,
    modelName: 'Friends',

});

const User = require('../models/User');
// Friends.hasOne(User, {foreignKey: 'user_id'});
// Friends.hasOne(User, { foreignKey: 'friend_id'});
module.exports = Friends;
