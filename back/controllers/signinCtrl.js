const bcrypt = require('bcrypt');
const connection = require('../db-config');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const utils = require('../utils/getUser');


exports.postSignin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const verify = await utils.getUser(email);
    const secret_Key = process.env.SECRETKEY;
    
    if(verify.ok){
        const hashPassword = verify ? verify.user[0].password : null;
        bcrypt.compare(password, hashPassword, function(err, result) {
            // result == true
        
            if(err){
                res.status(500).send('error password');
            }
            else if(result){
                res.status(200).send({
                    email:email,
                    token:jwt.sign(
                        {email:email},
                        secret_Key,
                        {expiresIn:'24h'}
                    )
                });
            }else{
                res.status(401).send('echec signin');
            }
        });
    }else{
        res.status(500).json({message:'echec signin'});
    }
};