import React from 'react';
import Server from "./Server";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serverId: 1,
            tasks: [],
            servers: []
        }
        this.DELETE_TASK_TIME = 10*1000;
    }

    async componentDidMount() {
        await fetch('http://localhost:8080/api/servers')
            .then(json => {
                json.json().then(json => {
                    this.setState({
                        servers: json
                    })
                })
            })
    }

    loadServers = async () => {
        await fetch('http://localhost:8080/api/servers')
            .then(json => {
                json.json().then(json => {
                    this.setState({
                        servers: json
                    })
                })
            })
    }


    createServer = async () => {
        const self = this;
         await fetch('http://localhost:8080/api/servers', {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(json => {
            json.json().then(json => {
                console.log(json)
                self.loadServers()
            })
         })
    }

    deleteTask = async (id) => {
        await fetch('http://localhost:8080/api/tasks/' + id, {
            method: 'DELETE',
        }).then(json => {
            json.json().then(json => {
                console.log(json)
            })
        })
    }

    setTasks = async () => {
        await fetch('http://localhost:8080/api/tasks')
            .then(json => {
                json.json().then(json => {
                    this.setState({
                        tasks: json
                    })
                })
            })
    }

    createTask = async () => {
        console.log(this.state.serverId)
        var self = this;
        const response = await fetch('http://localhost:8080/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                serverId: this.state.serverId
            })
        }).then(json => {
            json.json().then(json => {
                self.setTasks();
                setTimeout(function () {
                    self.deleteTask(json.id).then(message => {
                        console.log(message)
                    })
                    document.getElementById(json.id).remove();
                }, self.DELETE_TASK_TIME)
            })
        })
    }

    handleChange = (e) => {
        this.setState({ serverId: e.target.value });
    }


    render() {
        return(
            <div>
                <div className={'col-sm-12'}>
                    <button onClick={this.createServer}>Create Server</button>
                    <hr/>
                    <Server servers={this.state.servers} tasks={this.state.tasks}/>
                    <input type="number" placeholder={'Please enter server id'} onChange={ this.handleChange } />
                    <input
                        type="button"
                        value="Create Task"
                        onClick={this.createTask}
                    />

                </div>
            </div>
        )
    }
}
