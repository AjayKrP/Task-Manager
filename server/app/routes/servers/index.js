const servers = require("../../controllers/server");
const express = require("express");
const serverRouter = express();

serverRouter.post("/", servers.create);

serverRouter.get("/", servers.findAll);

serverRouter.get("/:id", servers.findOne);

serverRouter.delete("/:id", servers.delete);

module.exports = serverRouter;