import { StateStore } from '../dist/index';

const TodoStateStore = new StateStore({
  todos: [{
    title: 'Finish tests',
    complete: false
  }]
});

export default TodoStateStore;