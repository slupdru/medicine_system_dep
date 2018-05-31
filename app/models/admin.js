const Sequelize = require('sequelize');
const db = require('../db');

const Admin = db.define('admin', {
    name: Sequelize.STRING,
    password: Sequelize.STRING
});
Admin.sync();

module.exports = Admin;