module.exports = app => {
    const taskRouter = require("./tasks");
    const serverRouter = require('./servers');

    app.use('/api/tasks', taskRouter);
    app.use('/api/servers', serverRouter)

};