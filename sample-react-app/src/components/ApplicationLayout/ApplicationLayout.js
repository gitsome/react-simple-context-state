import React from 'react';

import DemoUserCard from '../DemoUserCard/DemoUserCard';
import DemoTodos from '../DemoTodos/DemoTodos';

import AppStateContext from '../../StateContexts/AppStateContext';

import './ApplicationLayout.css';
export default class ApplicationLayout extends React.Component {

  render () {

    return (
      <AppStateContext.Consumer>
        {({ userState }) => {

          return (
            <div className="application-layout container">

              <div className="row">
                <div className="col-lg-10 offset-lg-1 mb-5 mt-3">
                  <blockquote className="blockquote">These demos illustrate how <span className="badge badge-light">StateStores</span> can be created and used to generate a <span className="badge badge-light">StateContext</span> for use across an application. Some demos share state from the top level app. Others have their own internal context based state.</blockquote>
                </div>
              </div>

              <div className="row">

                <div className="col-lg-6 mb-4">

                  <div className="demo-item">
                    <div className="demo-details">
                      <h2>User Card Demo</h2>
                      <ul className="mb-4">
                        <li>Illustrates passing down context state to a <span className="badge badge-light">UserCard</span> component</li>
                        <li>Shows use case for internal state. The <span className="badge badge-light">UserCard</span> uses it for tracking the current tab</li>
                        <li>Uses <span className="badge badge-light">asycState</span> properties to help aleviate user experience around loading tweets asynchronously</li>
                      </ul>
                      <p>
                        See that the <a href="https://github.com/gitsome/react-simple-context-state/blob/master/sample-react-app/src/components/ApplicationLayout/ApplicationLayout.js" target="_blank" rel="noopener noreferrer" className="badge badge-info">ApplicationLayout</a> component passes context state down through the <a href="" target="_blank" rel="noopener noreferrer" className="badge badge-info">DemoUserCard</a> component. Also check out the to the and the <a href="" target="_blank" rel="noopener noreferrer" className="badge badge-info">UserCard</a> component accesses the <a href="" target="_blank" rel="noopener noreferrer" className="badge badge-info">UserStateStore</a> directly to update the users tweets.
                      </p>
                    </div>

                    <div className="demo-area">
                      <DemoUserCard user={userState}></DemoUserCard>
                    </div>
                  </div>

                </div>

                <div className="col-lg-6">

                  <div className="demo-item">
                    <div className="demo-details">
                      <h2>Todo List Demo</h2>
                      <ul className="mb-4">
                        <li>The <span className="badge badge-light">Todos</span> component uses a consumer to access <span className="badge badge-light">userState</span></li>
                        <li>Internal state is used to track the state of the todo creation input.</li>
                      </ul>
                      <p>
                        Check out the ApplicationLayout component <a href="" target="_blank" rel="noopener noreferrer"></a> and the <span className="badge badge-light">UserCard</span>
                      </p>
                    </div>

                    <div className="demo-area">
                      <DemoTodos/>
                    </div>
                  </div>
                </div>

              </div>

              <div className="row">
                <div className="col-12 mt-5">
                  <p className="text-center">View the docs for this library at the <a href="https://github.com/gitsome/react-simple-context-state" target="_blank" rel="noopener noreferrer">ReactSimpleState GitHub Repository</a>.</p>
                </div>
              </div>

            </div>
          );
        }}
      </AppStateContext.Consumer>
    );
  }
}


