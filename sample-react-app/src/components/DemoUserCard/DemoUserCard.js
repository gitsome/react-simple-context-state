import React from 'react';

import StateContext from '../../dist/classes/StateContext';
import { SourceCodeLink, Property } from '../SourceCodeLink/SourceCodeLink';

import UserStateStoreFactory from '../../StateStoreFactories/UserStateStoreFactory';

import TweetService from '../../services/TweetService';
import UserCard from '../UserCard/UserCard';

export default class DemoUserCard extends React.Component {

  constructor (props) {
    super(props);

    this.stateStores = {
      userState: UserStateStoreFactory()
    };
  }

  onUserTweetsRequested () {

    // grab the userStateStore
    const userStateStore = StateContext.getStateStore('userState');

    // use the tweetsLoadingUpdate method that was generated automatically for the asyncState 'tweets' property
    userStateStore.tweetsLoadingUpdate(true);

    TweetService.getTweetsForUser(userStateStore.twitterHandle).then((response) => {

      // if you have multiple items to update synchrounously, use the update method on the StateStore instance
      userStateStore.update({
        tweets: response,
        tweetsLoading: false,
        tweetsError: false
      });

    }).catch((error) => {

      // use the convenient update method to update all the asyncState related properties
      userStateStore.update({
        tweets: false,
        tweetsLoading: false,
        tweetsError: error
      });
    });
  }

  render () {
    return (
      <StateContext.Provider stateStores={this.stateStores}>
        <div className="demo-container reading-width">

          <div className="row demo-dtails">
            <div className="col mb-3">
              <h1>User Card Demo</h1>
              <p>
                The <SourceCodeLink file="DemoUserCard"/> component passes context state down into the <SourceCodeLink file="UserCard"/> component. It then listens to events and uses the <SourceCodeLink file="UserStateStore"/> directly to fetch tweets and update the user state.  The <SourceCodeLink file="UserCard"/> component uses some internal state too for trackint the current tab.
              </p>
            </div>
          </div>

          <div className="demo-item">
            <StateContext.Consumer>
              {({ userState }) => {
                return (
                  <UserCard user={userState} onTweetsRequested={() => { this.onUserTweetsRequested(); }} />
                )
              }}
            </StateContext.Consumer>
          </div>

        </div>
      </StateContext.Provider>
    );
  }
}