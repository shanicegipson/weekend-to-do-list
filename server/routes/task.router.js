const express = require('express');
const taskRouter = express.Router();


// DB CONNECTION
const pool = require('../modules/pool');

// GET
taskRouter.get('/', (req, res) => {
    const queryText = 'SELECT * FROM "task";';

    pool.query(queryText)
        .then((result) => {
            console.log(result)
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('Error: ', err);
            res.sendStatus(500);
        });
});

// POST
taskRouter.post('/', (req, res) => {
    const newTask = req.body;
    const queryText = `INSERT INTO "task" ("task", "date")
                        VALUES ($1, $2);`;
    console.log( newTask.task);
    pool.query(queryText, [newTask.task, newTask.date])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('Error posting: ', err);
            res.sendStatus(500);
        });

});

// PUT
taskRouter.put('/:id', (req, res) => {
    const taskId = req.params.id;
    
    const queryText = `UPDATE "task" SET "status"='not to complete' WHERE id=$1;`;

    pool.query(queryText, [taskId])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Error updating database: ', err);
            res.sendStatus(500);
        });
});


// DELETE
taskRouter.delete('/:id', (req, res) => {
    console.log(req.params);

    const queryText = `DELETE FROM "task" WHERE id=$1`;

    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Error deleting: ', err);
            res.sendStatus(500);
        });
});

module.exports = taskRouter;
