const Sequelize = require('sequelize');
const keys = require('../configs/keys');

const sequelize = new Sequelize(
    keys.sequelize.db_name,
    keys.sequelize.user_name,
    keys.sequelize.password,
    keys.sequelize.options
);

module.exports = sequelize;
