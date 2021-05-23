const connection = require("../db-config");

exports.getAllTodos = (req, res) => {
    const email = req.params.email;
    const sql = 'SELECT t.id, t.title, t.completed, t.date_debut, t.date_fin, t.ref_todo, u.email, u.username FROM todo as t JOIN user as u ON t.id_user = u.id WHERE u.email=?';
    connection.query(sql, [email], (err, results) => {
        if (err) {
            res.status(500).send('error database');
        } else {
            res.status(200).json(results)
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

exports.updateToggleTodo = (req, res) => {
    let completed = req.body.currentTodoCompleted ? 1 : 0;
    let id = req.params.id;
    const sql = `UPDATE todo SET completed = ? WHERE todo.id = ?;`;
    connection.query(sql, [completed, id], (err, results) => {
        if (err) {
            res.status(500).send('error database');
        } else {
            res.status(200).json(results);
        }
    });
};



exports.postTodo = (req, res) => {
    const todo = req.body;
    const sql = `INSERT INTO todo (title, completed, date_debut, date_fin, id_user, ref_todo) VALUES (?, ?, ?, ?, ?, ?)`;
    connection.query(sql, [todo.title, todo.completed, todo.date_debut, todo.date_fin, todo.id_user, todo.ref_todo], (err, results) => {
        if (err) {
            console.log(err);
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