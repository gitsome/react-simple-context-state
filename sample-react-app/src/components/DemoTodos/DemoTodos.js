import React from 'react';

import { SourceCodeLink, Property } from '../SourceCodeLink/SourceCodeLink';
import Todos from '../Todos/Todos';

export default class DemoTodos extends React.Component {

  render () {
    return (
      <div class="demo-container">

        <div className="row demo-dtails">
          <div className="col mb-3">
            <h2>Todo List Demo</h2>
            <p>
              The <SourceCodeLink file="Todos"/> component uses a consumer to access <Property>userState</Property> from the <SourceCodeLink file="UserStateStore"/>. Internal state is used to track the state of the todo creation input inside of the <SourceCodeLink file="Todos"/> component. Check out the <SourceCodeLink file="ApplicationLayout"/> component and the <SourceCodeLink file="Todos"/> component.
            </p>
          </div>
        </div>

        <div className="demo-item">
            <Todos/>
        </div>
      </div>
    );
  }
}