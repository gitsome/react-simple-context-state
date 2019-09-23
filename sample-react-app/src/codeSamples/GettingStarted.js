const Step1 = `yarn add react-simple-context-state`;

const Step2 = `import React from 'react';
import { StateStore, StateContext } from 'react-simple-context-state';

import ApplicationLayout from '../components/ApplicationLayout/ApplicationLayout';

import './App.css';
export default class App extends React.Component {

  constructor (props) {
    super(props);

    this.stateStores = {
      userState: new StateStore({firstName: 'Bob', lastName: 'Loblaw'})
    };
  }

  render () {
    return (
      // Exposes 'userState' and 'userStateStore' to StateContext.Consumer component
      <StateContext.Provider stateStores={this.stateStores}>
        <ApplicationLayout></ApplicationLayout>
      </StateContext.Provider>
    );
  }
}`;

const Step3 = `import React from 'react';

import { StateContext } from 'react-simple-context-state';

export default class UserInfo extends React.Component {

  onChangeUserName () {
    this.state.context.userStateStore.firstNameUpdate('Robert');
  }

  render () {
    return (
      <StateContext.Consumer>
        {({ userState }) => {

          return (
            <div>
              <label>First Name: <span>{userState.firstName}</span></label>
              <label>Last Name: <span>{userState.lastName}</span></label>
              <button onClick={() => { this.onChangeUserName(); }}>Change Name</button>
            </div>
          );
        }}
      </StateContext.Consumer>
    );
  }
}`;

export { Step1, Step2, Step3 };