import React from 'react';
import { StateContext } from './dist/index';

import { HashRouter as Router } from "react-router-dom";

import TodoStateStoreFactory from './StateStoreFactories/TodoStateStoreFactory';
import AppStateStoreFactory from './StateStoreFactories/AppStateStoreFactory';

import SourceCodeViewer from './components/SourceCodeViewer/SourceCodeViewer';
import ApplicationLayout from './components/ApplicationLayout/ApplicationLayout';
import BackgroundNavigation from './components/BackgroundNavigation/BackgroundNavigation';

import './App.css';

export default class App extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      animate: false
    };

    this.stateStores = {
      todoState: TodoStateStoreFactory(),
      appState: AppStateStoreFactory()
    };
  }

  toggleBackgroundMenu () {
    this.stateStores.appState.backgroundMenuOpenUpdate(!this.stateStores.appState.backgroundMenuOpen);
  }

  closeBackgroundMenu () {
    this.stateStores.appState.backgroundMenuOpenUpdate(false);
  }

  render () {
    return (
      <Router basename={process.env.REACT_APP_ROUTER_BASENAME}>
        <StateContext.Provider stateStores={this.stateStores}>
          <StateContext.Consumer>
            {({ appState }) => {

              return (
                <div className="app-wrapper">
                  <header className="app-header container-fluid fixed-top">

                    <nav className="navbar navbar-dark navbar-expand-lg">
                      <button className="btn btn-outline-primary mr-3 d-sm-block d-xs-block d-md-none" onClick={(e) => { e.preventDefault(); e.stopPropagation(); this.toggleBackgroundMenu(); }}><i className="fa fa-bars"></i></button>
                      <a className="navbar-brand mr-auto" href="#">React Simple Context State</a>

                      <ul className="navbar-nav ml-auto d-none d-md-block">
                        <li className="nav-item">
                          <a href="https://github.com/gitsome/react-simple-context-state" target="_blank" rel="noopener noreferrer" className="nav-link"><i className="fa fa-github mr-1"></i> GitHub</a>
                        </li>
                      </ul>
                    </nav>
                  </header>

                  <div className={`app ${appState.backgroundMenuOpen ? 'app-show-background-navigation' : ''}`} onClick={(e) => { this.closeBackgroundMenu(); }}>
                    <ApplicationLayout/>
                    <div>BackgroundMenuOpen: {appState.backgroundMenuOpen}</div>
                  </div>

                  <SourceCodeViewer/>
                  <BackgroundNavigation/>
                </div>
              )
            }}
          </StateContext.Consumer>
        </StateContext.Provider>
      </Router>
    );
    }
}
