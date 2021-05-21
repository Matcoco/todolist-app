const connection = require("../db-config");

exports.getAllTodos = (req, res) => {
    const id_user = req.params.id_user;
    const sql = 'SELECT * from todo WHERE id_user=?';
    connection.query(sql, [id_user], (err, results) => {
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

exports.getOneTodo = (req, res) => {
    let id = req.params.id;
    const sql = `SELECT * from todo where id=?`;
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).send('error database');
        } else {
            res.status(200).json(results);
        }
    });
};

exports.postTodo = (req, res) => {
    const todo = req.body;
    const sql = `INSERT INTO todo (title, completed, date_debut, date_fin, id_user) VALUES (?, ?, ?, ?, ?)`;
    connection.query(sql, [todo.title, todo.completed, todo.date_debut, todo.date_fin, todo.id_user], (err, results) => {
        if (err) {
            res.status(500).send('error database');
        } else {
            todo.id = results.insertId;
            res.status(201).json(todo);
        }
    })
};

exports.deleteOneTodo = (req, res) => {
    const idTodo = req.params.id;
    const sql = `SELECT * FROM todo WHERE id= ?`;
    connection.query(sql, [idTodo], (err, results) => {
        if (err) {
            res.status(500).send('error database');
        } else {
            const sql = `DELETE FROM todo WHERE id=?`;
            connection.query(sql, [idTodo], (err, results) => {
                if (err) {
                    res.status(500).send('error database');
                } else {
                    res.status(202).json({ message: `la ressource a été supprimée : id ${idTodo}` });
                }
            });
        }
    })
};