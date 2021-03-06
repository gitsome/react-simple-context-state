import React from 'react';
import './Todos.css';
import remove from 'lodash/remove';

import { StateContext } from '../../dist';

export default class ApplicationLayout extends React.Component {

  constructor (props) {
    super(props);

    this.todoStateStore = StateContext.getStateStore('todoState');

    this.state = {
      todoInputValue: ''
    };
  }


  deleteTodo (todoToDelete) {

    const updatedTodos = remove(this.todoStateStore.todos, (todo) => {
      return todo.title !== todoToDelete.title;
    });

    this.todoStateStore.todosUpdate(updatedTodos);
  }

  toggleTodoComplete (todoToToggle) {

    const matchingTodo = this.todoStateStore.todos.find((todo) => {
      return todo.title === todoToToggle.title;
    });

    matchingTodo.complete = !matchingTodo.complete;

    this.todoStateStore.todosUpdate(this.todoStateStore.todos);
  }

  addTodo (todoTitle) {

    if (todoTitle.trim() === '') {
      return;
    }

    this.todoStateStore.todos.push({
      title: todoTitle,
      complete: false
    });

    this.todoStateStore.todosUpdate(this.todoStateStore.todos);

    this.setState({
      todoInputValue: ''
    });
  }

  onTodoInputChanged (event) {
    this.setState({todoInputValue: event.target.value});
  }

  render () {
    return (
      <StateContext.Consumer>
        {({ todoState }) => {

          return (
            <div className="todos">

              <div className="todos-list">
                {
                  todoState.todos.map((todo) => {
                      return (
                        <div className="todo-item container-fluid mb-3" key={todo.title}>
                          <div className="row">
                            <div className="col-md-8 col-sm-6">
                              <div className="todo-item-complete-wrapper">
                                <div className="todo-item-complete">
                                  <span className="todo-item-complete-button" onClick={() => { this.toggleTodoComplete(todo); }}>
                                    { !todo.complete && (
                                      <i className="fa fa-circle-o"></i>
                                    )}
                                    { todo.complete && (
                                      <i className="fa fa-check-circle"></i>
                                    )}
                                  </span>
                                </div>
                                <h5 className="todo-item-title">{todo.title}</h5>
                              </div>
                            </div>
                            <div className="col-md-4 col-sm-6">
                              <button className="btn btn-outline-secondary btn-block" onClick={() => { this.deleteTodo(todo); }}>Delete</button>
                            </div>
                          </div>
                        </div>
                      )
                  })
                }
              </div>

              <div className="todos-controls">
                <div className="btn-group">
                  <input type="text" value={this.state.todoInputValue} onChange={(event) => { this.onTodoInputChanged(event); }}/>
                  <button className="btn btn-primary" onClick={() => { this.addTodo(this.state.todoInputValue); }}><i className="fa fa-plus"></i> Add Todo</button>
                </div>
              </div>

            </div>
          );
        }}
      </StateContext.Consumer>
    );
  }
}

