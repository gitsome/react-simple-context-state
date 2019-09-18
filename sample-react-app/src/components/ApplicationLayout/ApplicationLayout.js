import React from 'react';

import UserCard from '../UserCard/UserCard';
import Todos from '../Todos/Todos';

import UserStateStore from '../../StateStores/UserStateStore';
import AppStateContext from '../../StateContexts/AppStateContext';

import TweetService from '../../services/TweetService';

import './ApplicationLayout.css';
export default class ApplicationLayout extends React.Component {

  onUserTweetsRequested () {

    UserStateStore.tweetsLoadingUpdate(true);

    TweetService.getTweetsForUser(UserStateStore.twitterHandle).then((response) => {
      UserStateStore.update({
        tweets: response,
        tweetsLoading: false,
        tweetsError: false
      });
    }).catch(function (error) {
      UserStateStore.update({
        tweets: false,
        tweetsLoading: false,
        tweetsError: error
      });
    });
  }

  render () {

    return (
      <AppStateContext.Consumer>
        {({ userState }) => {

          return (
            <div className="application-layout container">

              <div className="row">
                <div className="col-lg-10 offset-lg-1 mb-4">
                  <p>This demo illustrates how multiple <strong>StateStores</strong> can be created and used to generate a <strong>ReactSimpleStateContext</strong> that can be used across the app. It shows how to update shallow properties as well as how to update arrays.</p>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 mb-4">
                  <h2>Pass Down Context State</h2>
                  <p className="mb-4">
                    The user card below is being passed "userState" that is being consumed from a parent. It also has internal component state to track the active tab. This example also shows how to use `asycState` to help with asynchronous calls to load a user's tweets.
                  </p>
                  <h3>User Card Information</h3>
                  <UserCard user={userState} onTweetsRequested={() => { this.onUserTweetsRequested(); }}></UserCard>
                </div>
                <div className="col-lg-6">
                  <h2>Use Context State Directly</h2>
                  <p className="mb-4">
                    The Todos component below has it's own context consumer to access "todosState". It also has some internal state for the todo's input text.
                  </p>
                  <h3>Your Todo List</h3>
                  <Todos></Todos>
                </div>
              </div>

              <div className="row">
                <div className="col-12 mt-5">
                  <p className="text-center">View the docs for this library at the <a href="https://github.com/gitsome/react-simple-context-state" target="_blank" rel="noopener noreferrer">ReactSimpleState GitHub Repository</a>.</p>
                </div>
              </div>

            </div>
          );
        }}
      </AppStateContext.Consumer>
    );
  }
}


