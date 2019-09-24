# react-simple-context-state

Dead simple top down state management for React.

**WARNING** In development, working on tests, documentation. NOT READY FOR PRODUCTION.

## What Does it Do?

React is simple to work with, especially when all your state trickles down through the root of your application. Redux patterns encourage this but comes with extra boilerplate and futzing around with immutability and reducers.

This library is meant to make state management as simple as possible with the least amount of work.

Setting it up looks like this:

1. Create one or more instances of `StateStore`
3. Use the `StateContext.Provider` to distribute state down your component tree
4. Use the `StateContext.Consumer` to access values in your component templates
5. Update state directly through the `StateStore` instances
6. Sit back and enjoy your app development

That's it. This workflow gives you the benefits of a top level immutable state management approach without the fuss.

## Installation

```bash
yarn add react-simple-context-state
```

## Usage

You can view documentation on the website [on the website](https://johndavidmartin.com/sites/react-simple-context-state/)



## Using `asyncState` for Asynchronous State Workflows

This library provides some helpers to make dealing with asynchronous workflows easier to deal with from a state perspective.

Whenever you make an HTTP call, you typically will trigger a loading flag so the UI can show a spinner, then after the call completes, you need to stop the loading flag and possibly trigger and error flag depending on the outcome.

This is where `asyncState` can be used within a `StateStore` as it automatically adds standardized loading and error state.