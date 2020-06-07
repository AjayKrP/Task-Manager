const db = require("../models");
const Task = db.tasks;
const Server = db.servers;

const Op = db.Sequelize.Op;

// Create and Save a new Tasks
exports.create = (req, res) => {
    console.log(req.body);
    if (!req.body.serverId) {
        res.status(400).send({
            message: "serverId can not be empty!"
        });
        return;
    }

    Server.findByPk(req.body.serverId)
        .then(data => {
            if (data) {
                // Create a Task
                const task = {
                    serverId: req.body.serverId,
                };

                // Save Task in the database
                Task.create(task)
                    .then(data => {
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the Task."
                        });
                    });
            } else {
                res.status(400).send({
                    error: 'Please verify server id. Server Not found!'
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Task."
            });
        })
};

exports.findByServerId = (req, res) => {
    console.log(req.params);
    const serverId = req.params.serverId
    if (!req.params.serverId) {
        res.status(400).send({
            message: "serverId can not be empty!"
        });
    }

    var condition= {
        where: { serverId: serverId }
    }

    Task.findAll(condition)
        .then(tasks => {
            res.send(tasks)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while receiving tasks."
            });
        })

}

// Retrieve all Tasks from the database.
exports.findAll = (req, res) => {
    const description = req.query.description;
    var condition = description ? { description: { [Op.like]: `%${description}%` } } : null;

    Task.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tasks."
            });
        });
};

// Find a single Task with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Task.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving task with id=" + id
            });
        });
};



// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Task.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Task was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete task with id=${id}. Maybe Task was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Task with id=" + id
            });
        });
};

// Delete all Tasks from the database.
exports.deleteAll = (req, res) => {
    Task.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Tasks were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tasks."
            });
        });
};

// Find all published Tasks
exports.findAllTaskDone = (req, res) => {
    Task.findAll({ where: { taskDone: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tasks."
            });
        });
};

exports.markTaskAsDone = (req, res) => {
    const id = req.params.id;
    let updateValues = { taskDone: true };
    console.log('make as done: ' + id);
    Task.update(updateValues, {
        where: { id: id }
    }).then(num => {
        console.log(num)
        if (num === 1) {
            res.send({
                message: `Task id ${id} marked as done`
            });
        } else {
            res.send({
                message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`
            });
        }
    })
        .catch(err => {
            res.status(500).send({
                message: "Error updating task with id=" + id
            });
        });
};