import React from 'react';

import TweetService from '../../services/TweetService';
import UserStateStore from '../../StateStores/UserStateStore';

import UserCard from '../UserCard/UserCard';

export default class DemoUserCard extends React.Component {

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
    return (<UserCard user={this.props.user} onTweetsRequested={() => { this.onUserTweetsRequested(); }}></UserCard>);
  }
}