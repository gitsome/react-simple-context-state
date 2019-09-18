import { StateStore } from '../dist/index';

const UserStateStore = new StateStore({
  firstName: 'John',
  lastName: 'Martin',
  blurb: 'This is a sample blurb for the user.',
  profession: 'skateboarder',
  twitterHandle: '@JohnDavidFive',
  asyncState: {
    tweets: false
  }
});

export default UserStateStore;