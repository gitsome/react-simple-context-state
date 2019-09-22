import React from 'react';

import { SourceCodeLink, Property } from '../SourceCodeLink/SourceCodeLink';

export default class Home extends React.Component {

  render () {
    return (
      <div>

        <h2>React Simple Context State</h2>

        <div className="reading-width">
          <p>This library aims to provide dead simple top down state management for React applications.</p>

          <p>If you have a fairly simple application then state managment won't get much easier if you use this libary.</p>

          <p>By wrapping the context API, the library simplifies state management even more. It takes a top-down approach for delivering state like in the Redux pattern, but it avoids dealing with actions and reducers. You will give up the ability to time travel, but you also avoid the boilerplate.</p>
          <p>This solution is not for every application. It uses a brute force approach by making an immutable copy of each state store after each change and triggering an update at the root component whre state stores are registered. If your project has risk of having a lot of state and components, you may need to seek out other methods for tackling your state management problems.</p>

          <h3>Features</h3>
          <ol>
            <li>Does not require creation of context objects.</li>
            <li>Updating state stores automatically trigger top down updates through the component tree.</li>
            <li>No need for nested consumers, a single consumer can access state stores from any provider.</li>
            <li>Like the standard Context API, singleton global state stores can be used across the entire app.</li>
            <li>Factory based state stores can be created only when your components needs it.</li>
            <li>Helper properties provide you with common helper properties for handling async state behavior.</li>
          </ol>

          <p>Be sure to read the documentation on <a href="https://reactjs.org/docs/context.html" target="_blank" rel="noopener noreferrer">React's Context API</a>. Since this library uses it under the hood, it shares most of the same pros and cons.</p>

        </div>


        <div className="reading-width">
          <h3>What Next?</h3>
          <ol>
            <li>View the Getting Started page</li>
            <li>Dive deeper into the docs and the <a href="https://github.com/gitsome/react-simple-context-state" target="_blank" rel="noopener noreferrer">source code</a>.</li>
          </ol>
        </div>
      </div>
    )
  }
}
