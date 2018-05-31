const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
module.exports={
    register :  async ()=>{
        const hash = await bcrypt.hash('password', 3);
        const AdminN =  await Admin.create({
            name:'admin',
            password:hash
        });
        return AdminN;
    },
    findById:  function(id, cb) {
        process.nextTick( function() {
            Admin.findById(id)
                .then(admin => {
                    if (admin) {
                        cb(null, admin);
                    } else {
                        cb(new Error('User ' + id + ' does not exist'));
                    }
                })
                .catch(err => {
                    console.log(err.message);
                });
           
        });
    },
    findByUsername : function(username, cb) {
        process.nextTick(function() {
            Admin.findOne({ where: {name: username} }).then(admin => {
                if (admin) {
                    return  cb(null, admin);
                }
                return cb(null, null);
            })
                .catch(err => {
                    console.log(err.message);
                });  
        });
    }
};