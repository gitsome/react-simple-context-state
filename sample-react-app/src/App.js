import React from 'react';
import { StateContext } from './dist/index';

import { BrowserRouter as Router, NavLink } from "react-router-dom";

import TodoStateStoreFactory from './StateStoreFactories/TodoStateStoreFactory';
import AppStateStoreFactory from './StateStoreFactories/AppStateStoreFactory';

import SourceCodeViewer from './components/SourceCodeViewer/SourceCodeViewer';
import ApplicationLayout from './components/ApplicationLayout/ApplicationLayout';

import './App.css';

const ANIMATE_CLASSES = ["bounce", "flash", "pulse", "rubberBand", "shake", "swing", "tada", "wobble", "jello", "heartBeat"];
const getRandomAnimate = () => {
  return ANIMATE_CLASSES[(Math.round(Math.random() * ANIMATE_CLASSES.length))];
};

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

            <header className="app-header container-fluid fixed-top" onMouseEnter={() => { this.startAnimation(); }} onMouseLeave={() => { this.stopAnimation(); }}>

              <div className="row">
                <div className="col-lg-10 offset-lg-1">

                  <nav className="navbar navbar-dark navbar-expand-lg">
                    <a className={`navbar-brand animated ${this.state.animate ? getRandomAnimate() : ''}`} href="#">React Simple Context State</a>

                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <a href="https://github.com/gitsome/react-simple-context-state" target="_blank" rel="noopener noreferrer" className="nav-link"><i className="fa fa-github mr-1"></i> GitHub</a>
                      </li>
                    </ul>
                  </nav>

                </div>
              </div>

            </header>

            <ApplicationLayout/>

            <SourceCodeViewer/>

          </div>
        </StateContext.Provider>
      </Router>
    );
    }
}
