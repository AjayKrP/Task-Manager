import React from 'react';
import Task from './Task';

export default class Server extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        function RenderServerTask(props){
            var task = [];
            const server = props.server[0];
            const tasks = props.server[1];
            console.log(tasks)
            for (var i = 0; i < tasks.length; ++i) {
                if (server.id === tasks[i].serverId) {
                    task.push(tasks[i]);
                }
            }
            return <Task server={server} task={task}/>
        }

        return(
            <div>
                {this.props.servers.map((server, index) =>
                    <RenderServerTask server={[server, this.props.tasks]}/>
                )}
            </div>
        )
    }
}
