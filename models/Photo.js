const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Model = Sequelize.Model;

class Photos extends Model {
}

Photos.init({
        url: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'photos'
    }
);
module.exports = Photos;
