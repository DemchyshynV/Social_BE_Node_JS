const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Model = Sequelize.Model;

class Profile extends Model {
}

Profile.init({
    age: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    surname:{
        type: Sequelize.STRING
    },
    avatar: {
        type: Sequelize.STRING
    },
    admin:{
        type:Sequelize.BOOLEAN
    }
}, {
    sequelize,
    modelName: 'profile'
});

module.exports = Profile;
