import { StateStoreFactory } from '../dist/index';

const UserStateStoreFactory = StateStoreFactory({
  firstName: 'Robert',
  lastName: 'Loblaw',
  blurb: 'This is a sample blurb for the user.',
  profession: 'Law Blogger',
  twitterHandle: '@lawblogger',
  asyncState: {
    tweets: false
  }
});

export default UserStateStoreFactory;