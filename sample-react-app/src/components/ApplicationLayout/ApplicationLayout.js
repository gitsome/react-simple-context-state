import React from 'react';
import { Route } from "react-router-dom";

import { SourceCodeLink, Property } from '../SourceCodeLink/SourceCodeLink';

import DemoUserCard from '../DemoUserCard/DemoUserCard';
import DemoTodos from '../DemoTodos/DemoTodos';

import StateContext from '../../dist/classes/StateContext';

import './ApplicationLayout.css';
export default class ApplicationLayout extends React.Component {

  render () {

    return (
      <StateContext.Consumer>
        {({ appState }) => {

          return (
            <div className="application-layout container">

              <div className="row">
                <div className="col-lg-10 offset-lg-1 mb-5 mt-3">
                  <blockquote className="blockquote">These demos illustrate how <SourceCodeLink file="StateStores"/> can be created and used to generate an <SourceCodeLink file="AppStateContext"/> for use across an application. Some demos share state from the top level app. Others have their own internal context based state.</blockquote>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-8 offset-lg-2 mb-5 mt-3">
                  <Route path="/" exact component={DemoTodos} />
                  <Route path="/user-card" exact component={DemoUserCard} />
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


