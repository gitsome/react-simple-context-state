import React from 'react';
import { StateContext } from './dist/index';

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
      <StateContext.Provider stateStores={this.stateStores}>
        <div className="app">
          <header className="app-header" onMouseEnter={() => { this.startAnimation(); }} onMouseLeave={() => { this.stopAnimation(); }}><h1>React Simple Context State <i className={`fa fa-thumbs-up ml-2 animated ${this.state.animate ? 'bounce' : ''}`}></i></h1></header>
          <ApplicationLayout/>
        </div>
      </StateContext.Provider>
    );
    }
}
