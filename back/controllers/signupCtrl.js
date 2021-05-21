const bcrypt = require('bcrypt');
const connection = require('../db-config');
const utils = require('../utils/getUser');


exports.postSignup = (req, res) => {
    const formulaire = req.body;

    bcrypt.hash(formulaire.password, Number(process.env.SALT), async (err, hash) => {
        if (err) {
            res.send(500).json({ message: "error password" })
        } else {
            const body = {
                username: formulaire.username,
                password: hash,
                email: formulaire.email,
                date_inscription: formulaire.date_inscription,
                id_avatar: formulaire.id_avatar
            }
            const verify = await utils.getUser(body.email);
            
            if (verify.ok) {
                const sql = `INSERT INTO user (username,password,email,date_inscription,id_avatar) VALUES (?,?,?,?,?)`;
                connection.query(sql, [body.username, body.password, body.email, body.date_inscription, body.id_avatar], (err, results) => {
                    if (err) {
                        res.status(500).json({ message: /* `error database` */ err });
                    } else {
                        res.status(201).json({ message: `l'utilisateur a été créé.` });
                    }
                });
            } else {
                res.status(409).json({ message: `l'email est deja utilisé` });
            }
        }
    });
};