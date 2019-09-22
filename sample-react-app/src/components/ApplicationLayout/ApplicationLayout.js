import React from 'react';
import { Route, NavLink } from "react-router-dom";

import Home from '../Home/Home';
import DemoUserCard from '../DemoUserCard/DemoUserCard';
import DemoTodos from '../DemoTodos/DemoTodos';

import StateContext from '../../dist/classes/StateContext';

import './ApplicationLayout.css';
export default class ApplicationLayout extends React.Component {

  render () {

    return (
      <StateContext.Consumer>
        {({ appState }) => {

          return (
            <div className="application-layout container-fluid">

              <div className="row">

                <div className="col-sm-3">

                  <h4>About</h4>

                  <ul className="nav flex-column mt-3">
                    <li className="nav-item">
                      <NavLink to="/" exact className="nav-link" activeClassName="active"><i className="fa fa-home mr-1"></i> Introduction</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/getting-started" exact className="nav-link" activeClassName="active"><i className="fa fa-flag mr-1"></i> Getting Started</NavLink>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="https://github.com/gitsome/react-simple-context-state" target="_blank" rel="noopener noreferrer"><i className="fa fa-github mr-1"></i> Source Code</a>
                    </li>
                  </ul>

                  <div className="dropdown-divider"></div>

                  <h4>Demos</h4>
                  <ul className="nav flex-column mt-3">
                    <li className="nav-item">
                      <NavLink to="/todos" exact className="nav-link" activeClassName="active"><i className="fa fa-list mr-1"></i> Todos</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/user-card" className="nav-link" activeClassName="active"><i className="fa fa-user mr-1"></i>User Card</NavLink>
                    </li>
                  </ul>

                </div>

                <div className="col-sm-9">
                  <Route path="/" exact component={Home} />
                  <Route path="/todos" exact component={DemoTodos} />
                  <Route path="/user-card" exact component={DemoUserCard} />
                </div>
              </div>
            </div>
          );
        }}
      </StateContext.Consumer>
    );
  }
}


