const Medicine = require('../models/medicine');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const router = new require('express').Router();

const controls ={
    addOne: params => {
        console.log(params);
        return Medicine.create({
            photo:params.photo,
            name: params.name,
            price: params.price,
            runny_nose: params.runny_nose,
            cough: params.cough,
            pruritus: params.pruritus,
            temperature: params.temperature,
            other_symptoms: params.other_symptoms,
            pregnancy: params.pregnancy,
            under_12_years_old: params.under_12_years_old,
            allergy: params.allergy,
            heart_diseases: params.heart_diseases,
            heart_gkt: params.heart_gkt,
            other_contraindications: params.other_contraindications
        }
        );
    },
    selectByParams: (
        params,
        bottom_price,
        top_price,
    ) => {
        const paramsQwery ={
            price: {
                [Op.between]: [bottom_price, top_price]
            },
        };
        for (let param of params){
            paramsQwery[param]=true;
        }
        return Medicine.findAll({ where: paramsQwery });
    }

};

router
    .post('/getmedicine', async (req, res) => {
        const allFound = await controls.selectByParams(req.body.params, req.body.bottom_price, req.body.top_price);
        res.json(allFound);
    })
    .post('/savemedicine', require('connect-ensure-login').ensureLoggedIn('/false'), async (req, res) => {
        const allFound = await controls.addOne(req.body);
        res.json(allFound);
    });

module.exports = {router, controls};
