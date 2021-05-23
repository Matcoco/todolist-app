const connection = require("../db-config");

exports.getCurrentUser = (req, res) => {
    const email = req.params.email;
    const sql = 'SELECT * FROM user WHERE email=?';
    connection.query(sql, [email], (err, results) => {
        if (err) {
            res.status(500).send('error database');
        } else {
            results.length > 0
                ?
                res.status(200).json(results)
                :
                res.status(200).json({ message: "aucune ressource de disponible" })
        }
    });
};