const Sequelize = require('sequelize');
const db = require('../db');

const Medicine = db.define('medicine', {
    photo:Sequelize.STRING,
    name: Sequelize.STRING,
    price: Sequelize.INTEGER,
    runny_nose: Sequelize.BOOLEAN,
    cough: Sequelize.BOOLEAN,
    pruritus: Sequelize.BOOLEAN,
    temperature: Sequelize.BOOLEAN,
    other_symptoms: Sequelize.BOOLEAN,
    pregnancy: Sequelize.BOOLEAN,
    under_12_years_old: Sequelize.BOOLEAN,
    allergy: Sequelize.BOOLEAN,
    heart_diseases: Sequelize.BOOLEAN,
    heart_gkt: Sequelize.BOOLEAN,
    other_contraindications: Sequelize.BOOLEAN,
});
Medicine.sync();
module.exports = Medicine;