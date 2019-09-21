import React from 'react';

import StateContext from '../../dist/classes/StateContext';

import TweetService from '../../services/TweetService';
import UserCard from '../UserCard/UserCard';

export default class DemoUserCard extends React.Component {

  constructor (props) {
    super(props);
    this.userStateStore = StateContext.getStateStore('userState');
  }

  onUserTweetsRequested () {

    // use the tweetsLoadingUpdate method that was generated automatically for the asyncState 'tweets' property
    console.log("userStateStore:", this.userStateStore);
    this.userStateStore.tweetsLoadingUpdate(true);

    TweetService.getTweetsForUser(this.userStateStore.twitterHandle).then((response) => {

      // if you have multiple items to update synchrounously, use the update method on the StateStore instance
      this.userStateStore.update({
        tweets: response,
        tweetsLoading: false,
        tweetsError: false
      });

    }).catch((error) => {

      // use the convenient update method to update all the asyncState related properties
      this.userStateStore.update({
        tweets: false,
        tweetsLoading: false,
        tweetsError: error
      });
    });
  }

  render () {
    return (<UserCard user={this.props.user} onTweetsRequested={() => { this.onUserTweetsRequested(); }}></UserCard>);
  }
}