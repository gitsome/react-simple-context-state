import { StateStoreFactory } from '../dist/index';

const TodoStateStoreFactory = StateStoreFactory({
  todos: [{
    title: 'Finish tests',
    complete: false
  }]
});

export default TodoStateStoreFactory;