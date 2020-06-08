import React from 'react';

export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        }
    }

    async componentDidMount() {
        await fetch('http://localhost:8080/api/tasks/' + this.props.server.id)
            .then(json => {
                console.log(json)
                json.json().then(json => {
                    this.setState({
                        tasks: json
                    })
                })
            })
    }

    async deleteServer(id){
        await fetch('http://localhost:8080/api/servers/' + id, {
            method: 'DELETE',
        }).then(json => {
            json.json().then(json => {
                console.log(json)
                window.location.href = '/';
            })
        })
    }

    render() {
        return(
            <div>
                <h3 key={this.props.server.id}>ID: {this.props.server.id} Name: {this.props.server.name} <span><button onClick={() => this.deleteServer(this.props.server.id)}>DELETE</button></span></h3>
                {this.props.task.map((task, index) =>
                    <p id={task.id} key={index}>Task ID: {task.id}</p>
                )}
                <hr/>
            </div>
        )
    }
}
