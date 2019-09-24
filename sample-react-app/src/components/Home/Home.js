import React from 'react';

import { SourceCodeLink } from '../SourceCodeLink/SourceCodeLink';

export default class Home extends React.Component {

  render () {
    return (
      <div>

        <h1>React Simple Context State</h1>

        <div className="reading-width">

          <p>Dead simple top down state management for React applications.</p>
          <p>By wrapping the context API, the library simplifies state management even more. It takes a top-down approach for delivering state without the need for managing actions and reducers.</p>


          <h3 className="mt-5 mb-4">Features</h3>
          <ol>
            <li>Does not require creation of context objects.</li>
            <li>Updating state stores automatically trigger top down updates through the component tree.</li>
            <li>No need for nested consumers, a single consumer can access state stores from any provider.</li>
            <li>Like the standard Context API, singleton global state stores can be used across the entire app.</li>
            <li>Factory based state stores can be created only when your components needs it.</li>
            <li>Helper properties provide you with common helper properties for handling async state behavior.</li>
          </ol>

          <p>Be sure to read the documentation on <a href="https://reactjs.org/docs/context.html" target="_blank" rel="noopener noreferrer">React's Context API</a>. Since this library uses it under the hood, it shares most of the same pros and cons.</p>


          <h3 className="mt-5 mb-4">What Next?</h3>
          <ol>
            <li>View the Getting Started page</li>
            <li>Dive deeper into the docs and the <a href="https://github.com/gitsome/react-simple-context-state" target="_blank" rel="noopener noreferrer">source code</a>.</li>
          </ol>


          <h3 className="mt-5 mb-4">Should You Use This Library?</h3>
          <p>This solution is not for every application. It uses a brute force approach by making an immutable copy of each state store after each change and triggering an update at the root component where the associated <SourceCodeLink file="StateStore"/> is registered.</p>
          <p>If your project has risk of having a lot of state and components, you may need to seek out other methods for tackling your state management problems.</p>

          <p>Here is a table to help you decide:</p>

          <table className="table mt-4">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Scenario</th>
                <th scope="col">Use React Simple Context State?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Your application state is simple</th>
                <td className="text-center"><span className="badge badge-success">YES</span></td>
              </tr>
              <tr>
                <th>You require Redux style time travel</th>
                <td className="text-center"><span className="badge badge-danger">NO</span></td>
              </tr>
              <tr>
                <th>You have LOTS of concurrent state AND/OR components</th>
                <td className="text-center"><span className="badge badge-danger">NO</span></td>
              </tr>
            </tbody>
          </table>

        </div>

      </div>
    )
  }
}
