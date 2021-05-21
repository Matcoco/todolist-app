const connection = require('../db-config');

/**
 * permet de rechercher un email existant dans la table user
 * si l'email est trouvé, on retourne false sinon on retourne true
 * @param {*} email 
 * @returns {Object}
 */
exports.getUser = (email) => {
    const sql = `SELECT * FROM user WHERE email=?`;
    return new Promise((resolve) => {
        connection.query(sql, [email], (err, results) => {
            if (!results.length > 0) {
                resolve({ user: results, ok: false });
            } else {
                resolve({ user: results, ok: true });
            }
        });
    });
};