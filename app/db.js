const Sequelize = require('sequelize');
const sequelize = new Sequelize(null, null, null, {
    dialect: 'sqlite',
    storage: '../../db.sqlite3',
    operatorsAliases: false
});


module.exports = sequelize;