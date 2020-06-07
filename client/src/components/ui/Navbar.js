import React from 'react';
import {Link} from "react-router-dom";

export default class Navbar extends React.Component {
    render() {
        return(
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href={'/'}>Task Manager</a>
                    </div>
                </div>
            </nav>
        )
    }
}