import React from 'react';
import './BackgroundNavigation.css';
import { NavLink } from 'react-router-dom';

import { StateContext } from '../../dist';

export default class BackgroundNavigation extends React.Component {

  closeBackgroundNavigation () {
    StateContext.getStateStore('appState').backgroundMenuOpenUpdate(false);
  }

  render () {
    return (
      <div className="background-navigation text-light">

        <h4 className="mt-lg-3">About</h4>
        <div className="dropdown-divider"></div>

        <ul className="mt-3">
          <li>
            <a href="https://github.com/gitsome/react-simple-context-state" target="_blank" rel="noopener noreferrer" className="nav-link"><i className="fa fa-github mr-1"></i> GitHub</a>
          </li>
          <li>
            <NavLink to="/" exact className="nav-link" activeClassName="active" onClick={() => { this.closeBackgroundNavigation(); }}><i className="fa fa-info-circle mr-1"></i>Introduction</NavLink>
          </li>
          <li>
            <NavLink to="/getting-started" exact className="nav-link" activeClassName="active" onClick={() => { this.closeBackgroundNavigation(); }}><i className="fa fa-flag mr-1"></i>Getting Started</NavLink>
          </li>
        </ul>

        <h4 className="mt-5">Demos</h4>
        <div className="dropdown-divider"></div>

        <ul className="mt-3">
          <li>
            <NavLink to="/todos" exact className="nav-link" activeClassName="active" onClick={() => { this.closeBackgroundNavigation(); }}><i className="fa fa-list mr-1"></i>Todos</NavLink>
          </li>
          <li>
            <NavLink to="/user-card" className="nav-link" activeClassName="active" onClick={() => { this.closeBackgroundNavigation(); }}><i className="fa fa-user mr-1"></i>User Card</NavLink>
          </li>
        </ul>

      </div>
    );
  }
}


