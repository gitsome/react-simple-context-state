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

              <h1>React Simple Context State <i className={`fa fa-thumbs-up ml-2 animated ${this.state.animate ? 'bounce' : ''}`}></i></h1>

              <div className="container">
                <div className="row">
                    <div className="col">

                      <ul class="nav nav-tabs justify-content-center mt-3">
                        <li class="nav-item">
                         <NavLink to="/" exact className="nav-link" activeClassName="active"><i className="fa fa-list mr-1"></i> Todos</NavLink>
                        </li>
                        <li class="nav-item">
                          <NavLink to="/user-card" className="nav-link" activeClassName="active"><i className="fa fa-user mr-1"></i>User Card</NavLink>
                        </li>
                      </ul>
                  </div>
                </div>
              </div>

            </header>

            <ApplicationLayout/>

          </div>
        </StateContext.Provider>
      </Router>
    );
    }
}
