import React from 'react';
import { Route, NavLink } from "react-router-dom";

import Home from '../Home/Home';
import GettingStarted from '../GettingStarted/GettingStarted';
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

                <div className="col-md-3 col-lg-2 offset-lg-1">

                  <h4 className="mt-lg-3">About</h4>
                  <div className="dropdown-divider"></div>

                  <ul className="nav nav-pills flex-column mt-3">
                    <li className="nav-item">
                      <NavLink to="/" exact className="nav-link" activeClassName="active"><i className="fa fa-info-circle mr-1"></i>Introduction</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/getting-started" exact className="nav-link" activeClassName="active"><i className="fa fa-flag mr-1"></i>Getting Started</NavLink>
                    </li>
                  </ul>


                  <h4 className="mt-5">Demos</h4>
                  <div className="dropdown-divider"></div>

                  <ul className="nav nav-pills flex-column mt-3 mb-4">
                    <li className="nav-item">
                      <NavLink to="/todos" exact className="nav-link" activeClassName="active"><i className="fa fa-list mr-1"></i>Todos</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/user-card" className="nav-link" activeClassName="active"><i className="fa fa-user mr-1"></i>User Card</NavLink>
                    </li>
                  </ul>

                </div>

                <div className="col-md-9 offset-lg-1 col-lg-7">
                  <Route path="/" exact component={Home} />
                  <Route path="/getting-started" exact component={GettingStarted} />
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


