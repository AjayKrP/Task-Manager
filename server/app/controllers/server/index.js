const db = require("../../models");
const Server = db.servers;
const Task = db.tasks;
const Op = db.Sequelize.Op;
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

function totalServers() {
    Server.count().then(c => {
        return c;
    })
}

exports.create = (req, res) => {

    Server.count().then(c => {
        if (c < 10) {
            const serverName = uniqueNamesGenerator({
                dictionaries: [colors, adjectives, animals]
            });
            const server = {
                name: serverName
            };

            Server.create(server)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the Server."
                    });
                });
        } else {
            res.send({message: 'can\'t create more than 10 servers'})
        }
    })
};

// Retrieve all Tasks from the database.
exports.findAll = (req, res) => {
    const server = req.query.server;
    var condition = server ? { name: { [Op.like]: `%${server}%` } } : null;

    Server.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving servers."
            });
        });
};

// Find a single Task with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Server.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Server with id=" + id
            });
        });
};

// TODO delete only if none task is processing by the current server
exports.delete = (req, res) => {
    const id = req.params.id;
    Task.findAll({
        where: { serverId: id }
    }).then(c => {
        console.log(c)
        if (c.length === 0) {
            Server.destroy({
                where: { id: id }
            })
                .then(num => {
                    if (num === 1) {
                        res.send({
                            message: "Server was deleted successfully!"
                        });
                    } else {
                        res.send({
                            message: `Cannot delete Server with id=${id}. Maybe Task was not found!`
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Could not delete Task with id=" + id
                    });
                });
        } else {
            res.status(400).send({
                message: `Cannot delete Server with id=${id}. Maybe Server not found!`
            });
        }
    })
};
