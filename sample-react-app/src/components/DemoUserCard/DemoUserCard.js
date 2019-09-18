import React from 'react';

import TweetService from '../../services/TweetService';
import UserStateStore from '../../StateStores/UserStateStore';

import UserCard from '../UserCard/UserCard';

export default class DemoUserCard extends React.Component {

  onUserTweetsRequested () {

    // use the tweetsLoadingUpdate method that was generated automatically for the asyncState 'tweets' property
    UserStateStore.tweetsLoadingUpdate(true);

    TweetService.getTweetsForUser(UserStateStore.twitterHandle).then((response) => {

      // if you have multiple items to update synchrounously, use the update method on the StateStore instance
      UserStateStore.update({
        tweets: response,
        tweetsLoading: false,
        tweetsError: false
      });

    }).catch(function (error) {

      // use the convenient update method to update all the asyncState related properties
      UserStateStore.update({
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