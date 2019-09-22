import React from 'react';
import { StateContext } from './dist/index';

import { BrowserRouter as Router, NavLink } from "react-router-dom";

import TodoStateStoreFactory from './StateStoreFactories/TodoStateStoreFactory';
import UserStateStoreFactory from './StateStoreFactories/UserStateStoreFactory';

import ApplicationLayout from './components/ApplicationLayout/ApplicationLayout';

import './App.css';
export default class App extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      animate: false
    };

    this.stateStores = {
      userState: UserStateStoreFactory(),
      todoState: TodoStateStoreFactory()
    };
  }

  startAnimation () {
    this.setState({animate: true});
  }
  stopAnimation () {
    this.setState({animate: false});
  }

  render () {
    return (
      <Router>
        <StateContext.Provider stateStores={this.stateStores}>
          <div className="app">

            <header className="app-header" onMouseEnter={() => { this.startAnimation(); }} onMouseLeave={() => { this.stopAnimation(); }}>

              <nav className="navbar navbar-expand-lg">

                <a className="navbar-brand" href="#">
                  React Simple Context State
                </a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <a href="https://github.com/gitsome/react-simple-context-state" target="_blank" rel="noopener noreferrer" className="nav-link"><i className="fa fa-github mr-1"></i> GitHub</a>
                    </li>
                  </ul>
                </div>

              </nav>

            </header>

            <ApplicationLayout/>

          </div>
        </StateContext.Provider>
      </Router>
    );
    }
}
