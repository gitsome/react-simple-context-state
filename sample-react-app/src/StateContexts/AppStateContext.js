import { ReactSimpleStateContext } from '../dist/index';

import UserStateStore from '../StateStores/UserStateStore';
import TodoStateStore from '../StateStores/TodoStateStore';

const AppStateContext = new ReactSimpleStateContext({userState: UserStateStore, todoState: TodoStateStore});

export default AppStateContext;