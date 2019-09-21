import React from 'react';

import DemoUserCard from '../DemoUserCard/DemoUserCard';
import DemoTodos from '../DemoTodos/DemoTodos';

import StateContext from '../../dist/classes/StateContext';

import { SourceCodeLink, Property } from '../SourceCodeLink/SourceCodeLink';

import './ApplicationLayout.css';
export default class ApplicationLayout extends React.Component {

  render () {

    return (
      <StateContext.Consumer>
        {({ userState }) => {

          return (
            <div className="application-layout container">

              <div className="row">
                <div className="col-lg-10 offset-lg-1 mb-5 mt-3">
                  <blockquote className="blockquote">These demos illustrate how <SourceCodeLink file="StateStores"/> can be created and used to generate an <SourceCodeLink file="AppStateContext"/> for use across an application. Some demos share state from the top level app. Others have their own internal context based state.</blockquote>
                </div>
              </div>

              <div className="row">

                <div className="col-lg-6 mb-4">

                  <div className="demo-item">
                    <div className="demo-details">
                      <h2>Todo List Demo</h2>
                      <ul className="mb-4">
                        <li>The <SourceCodeLink file="Todos"/> component uses a consumer to access <Property>userState</Property> from the <SourceCodeLink file="UserStateStore"/></li>
                        <li>Internal state is used to track the state of the todo creation input inside of the <SourceCodeLink file="Todos"/> component</li>
                      </ul>
                      <p>
                        Check out the <SourceCodeLink file="ApplicationLayout"/> component and the <SourceCodeLink file="Todos"/> component.
                      </p>
                    </div>

                    <div className="demo-area">
                      <DemoTodos/>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">

                  <div className="demo-item">
                    <div className="demo-details">
                      <h2>User Card Demo</h2>
                      <ul className="mb-4">
                        <li>Passes down context state to a <SourceCodeLink file="UserCard"/> component</li>
                        <li>Uses internal state. The <SourceCodeLink file="UserCard"/> uses it for tracking the current tab</li>
                        <li>Uses <Property>asycState</Property> tweets property</li>
                      </ul>
                      <p>
                        See that the <SourceCodeLink file="ApplicationLayout"/> component passes context state down through the <SourceCodeLink file="DemoUserCard"/> component which accesses the <SourceCodeLink file="UserStateStore"/> directly to fetch tweets and update the user state.  The <SourceCodeLink file="UserCard"/> component uses some internal state too.
                      </p>
                    </div>

                    <div className="demo-area">
                      <DemoUserCard user={userState}></DemoUserCard>
                    </div>
                  </div>

                </div>

              </div>

              <div className="row">
                <div className="col-12 mt-5">
                  <p className="text-center">View the docs for this library at the <a href="https://github.com/gitsome/react-simple-context-state" target="_blank" rel="noopener noreferrer">react-simple-context-state</a> GitHub Repository.</p>
                </div>
              </div>

            </div>
          );
        }}
      </StateContext.Consumer>
    );
  }
}


