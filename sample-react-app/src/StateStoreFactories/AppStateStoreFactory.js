import { StateStoreFactory } from '../dist/index';

const AppStateStoreFactory = StateStoreFactory({
  currentSourceFile: false,
  asyncState: {
    sourceCode: false
  }
});

export default AppStateStoreFactory;