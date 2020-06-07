import React, {Component} from 'react';
import { Switch } from 'react-router';
import {Navbar, Home, Page404 } from "../ui";
import { BrowserRouter, Route } from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <Navbar />
                        <Switch>
                            <Route exact path="/">
                                <Home/>
                            </Route>
                            <Route exact>
                                <Page404/>
                            </Route>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
