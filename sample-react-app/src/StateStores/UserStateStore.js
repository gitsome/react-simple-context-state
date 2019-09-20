import { StateStore } from '../dist/index';

const UserStateStore = new StateStore({
  firstName: 'Robert',
  lastName: 'Loblaw',
  blurb: 'This is a sample blurb for the user.',
  profession: 'Law Blogger',
  twitterHandle: '@lawblogger',
  asyncState: {
    tweets: false
  }
});

export default UserStateStore;