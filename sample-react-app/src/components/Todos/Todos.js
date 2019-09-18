import React from 'react';
import './Todos.css';
import remove from 'lodash/remove';

import TodoStateStore from '../../StateStores/TodoStateStore';
import AppStateContext from '../../StateContexts/AppStateContext';

export default class ApplicationLayout extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      todoInputValue: ''
    };
  }


  deleteTodo (todoToDelete) {

    const updatedTodos = remove(TodoStateStore.todos, (todo) => {
      return todo.title !== todoToDelete.title;
    });

    TodoStateStore.todosUpdate(updatedTodos);
  }

  toggleTodoComplete (todoToToggle) {

    const matchingTodo = TodoStateStore.todos.find((todo) => {
      return todo.title === todoToToggle.title;
    });

    matchingTodo.complete = !matchingTodo.complete;

    TodoStateStore.todosUpdate(TodoStateStore.todos);
  }

  addTodo (todoTitle) {

    console.log("todoTitle:", todoTitle);

    TodoStateStore.todos.push({
      title: todoTitle,
      complete: false
    });

    TodoStateStore.todosUpdate(TodoStateStore.todos);

    this.setState({
      todoInputValue: ''
    });
  }

  onTodoInputChanged (event) {
    this.setState({todoInputValue: event.target.value});
  }

  render () {
    return (
      <AppStateContext.Consumer>
        {({ todoState }) => {

          return (
            <div className="todos">

              <div className="todos-list">
                {
                  todoState.todos.map((todo) => {
                      return (
                        <div className="todo-item container-fluid mb-3" key={todo.title}>
                          <div className="row">
                            <div className="col col-1">
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
                            </div>
                            <div className="col col-8">
                              <h5 className="todo-item-title">{todo.title}</h5>
                            </div>
                            <div className="col col-3">
                              <a href="#" className="btn btn-outline-secondary btn-block" onClick={() => { this.deleteTodo(todo); }}>Delete</a>
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
      </AppStateContext.Consumer>
    );
  }
}

