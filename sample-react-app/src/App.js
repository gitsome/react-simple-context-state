import React from 'react';
import './App.css';

import AppStateContext from './StateContexts/AppStateContext';
import ApplicationLayout from './components/ApplicationLayout/ApplicationLayout';

export default class App extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      animate: false
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
      <AppStateContext.Provider>
        <div className="app">
          <header className="app-header" onMouseEnter={() => { this.startAnimation(); }} onMouseLeave={() => { this.stopAnimation(); }}><h1>React Simple Context State <i className={`fa fa-thumbs-up ml-2 animated ${this.state.animate ? 'tada' : ''}`}></i></h1></header>
          <ApplicationLayout/>
        </div>
      </AppStateContext.Provider>
    );
    }
}
