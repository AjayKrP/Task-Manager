const tasks = require("../../controllers");
const express = require("express");
const taskRouter = express();


// Create a new Task
taskRouter.post("/", tasks.create);

// Retrieve all Tasks
taskRouter.get("/", tasks.findAll);

taskRouter.get("/:serverId", tasks.findByServerId);

// Retrieve all published Tasks
taskRouter.get("/published", tasks.findAllTaskDone);

// Delete a Task with id
taskRouter.delete("/:id", tasks.delete);

// Create a new Task
taskRouter.delete("/", tasks.deleteAll);


module.exports = taskRouter;