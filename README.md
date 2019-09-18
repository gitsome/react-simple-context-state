# react-simple-context-state

Dead simple top down state management for React.

**WARNING** In development, working on tests, documentation. NOT READY FOR PRODUCTION.

## What Does it Do?

React is simple to work with, especially when all your state trickles down through the root of your application. Redux patterns encourage this but comes with extra boilerplate and futzing around with immutability and reducers.

This library is meant to make state management as simple as possible with the least amount of work.

Setting it up looks like this:

1. Create one or more instances of `StateStore`
2. Create a `StateContext` instance
3. Use the `StateContext` instance `Provider` to distribute state down your component tree
4. Use the `StateContext` instance `Consumer` to access values in your component templates
5. Update state directly through the `StateStore` instances
6. Sit back and enjoy your app development

That's it. This workflow gives you the benefits of a top level immutable state management approach without the fuss.

## Installation

```bash
yarn add react-simple-context-state
```

## Usage

### Create Your State Stores

You can create one or many instances of `StateStore`. Break them up according to major feature sets or separated data models.

Ideally, each instance should be in it's own module so it can be used to both generate the context driven state management as well as pulled in to components that need to modify that state.

```javascript
// UserStateStore.js
import { StateStore } from 'react-simple-context-state';

const UserStateStore = new StateStore({
  firstName: 'Bob',
  lastName: 'Loblaw',
  blurb: 'This is a sample blurb for the user.',
  profession: 'Law Blogger',
  asyncState: {
    isLoading: false
  }
});

export default UserStateStore;
```

Simply add your keys and initial values. Note that the `asyncState` key is a **reserved** key. The properties inside this key are still tracked as state, but the library automatically creates some helpers for these keys. These helpers are great for dealing with async processes that can be in progress and also end up with errors. More on that down below.

### Generate a StateContext Instance

This is the class that generates the `Provider` and `Consumer` for the context based state management. It provides all state associated with any StateStore passed to the `StateContext` instance during creation.

```javascript
// AppStateContext.js
import { StateContext } from 'react-simple-context-state';
import UserStateStore from '../StateStores/UserStateStore';

// pass in one or more StateStore instances as key value pairs. The key is the key to use when consuming the state
const AppStateContext = new StateContext({userState: UserStateStore});

export default AppStateContext;
```

### Add the StateContext Provider

Now it's time to determine where in your component tree you should start providing the state associated with your `StateContext` instance. In many apps, it's should be placed at the very top. In large apps, it might be good to put the `Provider` lower in the component tree.

```javascript
// App.js
import React from 'react';
import './App.css';

import AppStateContext from './StateContexts/AppStateContext';
import ApplicationLayout from './components/ApplicationLayout/ApplicationLayout';

function App() {

  return (
    <AppStateContext.Provider>
      <div className="app">
        <header className="app-header">App Header</header>
        <ApplicationLayout/>
      </div>
    </AppStateContext.Provider>
  );
}

export default App;
```

### Access State Using the StateContext Consumer

Further down the component tree, you can now access state within your templates by using your `StateContext` instance's `Consumer`. You'll need to grab each key based on how each StateStore was registered with your `StateContext` instance during instantiation.

```javascript
// ApplicationLayout.js
import React from 'react';
import AppStateContext from '../../StateContexts/AppStateContext';
import UserCard from '../UserCard/UserCard';

import './ApplicationLayout.css';
function ApplicationLayout() {
  return (
    <AppStateContext.Consumer>
      {({ userState }) => {

        return (
          <div className="application-layout container">

            <div className="row">
              <div className="col">
                <h2>{userState.firstName}</h2>
                <UserCard user={userState}></UserCard>
              </div>
            </div>

          </div>
        );
      }}
    </AppStateContext.Consumer>
  );
}

export default ApplicationLayout;
```

## Updating State

The state that is consumed within the templates is an immutable snapshot. You cannot modify your state from the state that comes through the `StateContext.Consumer`. You should modify your state through the appropriate `StateStore`.

While the raw values for your state are exposed on the `StateStore` instance, it's important not to mutate them directly. Rather, use one of several methods on the `StateStore` to update state. This will ensure the proper triggers fire so that the application updates appropriately.



## Using `asyncState` for Asynchronous State Workflows

This library provides some helpers to make dealing with asynchronous workflows easier to deal with from a state perspective.

Whenever you make an HTTP call, you typically will trigger a loading flag so the UI can show a spinner, then after the call completes, you need to stop the loading flag and possibly trigger and error flag depending on the outcome.

This is where `asyncState` can be used within a `StateStore` as it automatically adds standardized loading and error state.