import { StateStoreFactory } from '../dist/index';

const AppStateStoreFactory = StateStoreFactory({
  currentSourceFile: false,
  backgroundMenuOpen: false,
  asyncState: {
    sourceCode: false
  }
});

export default AppStateStoreFactory;