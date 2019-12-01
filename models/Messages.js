const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Model = Sequelize.Model;

class Messages extends Model {
}

Messages.init({
    body: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'messages'
});

module.exports = Messages;
