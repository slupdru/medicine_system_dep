
const express = require('express');
const path = require('path');
const medicineControllers = require('./controllers/medicineControllers');
const app = express();
const adminContr = require('./controllers/adminControllers');
adminContr.register();
app
    // .use(require('morgan')('combined'))
    .use(require('cookie-parser')())
    .use(require('body-parser').json())
    .use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }))
    .use(require('body-parser').urlencoded({ extended: true }));

const authPlugin = require('./auth');
authPlugin(app);
app.get('/false', async function(req, res) {
    let result =false;
    res.json(result);
});
app.get('/notlogin', async function(req, res) {
    let result ={auth:false};
    res.json(result);
});
app.get('/checklogin',require('connect-ensure-login').ensureLoggedIn('/notlogin'), async function(req, res) {
    let result ={auth:true};
    res.json(result);
});
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
app.use(medicineControllers.router);
app.use(express.static(path.join(__dirname, '../public')));
app.get('*',  function(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, '../public') });
});





app.listen(3000);